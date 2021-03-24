import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';
import validator from '@middy/validator';
import { getProductById } from './getProduct';
import { uploadPictureToS3 } from '../../lib/uploadPictureToS3';
import { setPictureUrl } from '../../lib/setPictureUrl';
import updateProductPictureSchema from '../../lib/schemas/updateProductPictureSchema';

const updateProductPicture = async (event) => {
  const { id } = event.pathParameters;
  const product = await getProductById(id);

  const base64 = event.body.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');

  let updatedProduct;

  try {
    const pictureUrl = await uploadPictureToS3(`${product.id}.jpg`, buffer);
    updatedProduct = await setPictureUrl(product.id, pictureUrl);
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedProduct),
  };
};

export const handler = middy(updateProductPicture)
  .use(httpErrorHandler())
  .use(validator({ inputSchema: updateProductPictureSchema }));
