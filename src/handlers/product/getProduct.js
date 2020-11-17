import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from '../../lib/commonMiddleware';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const getProductById = async (id)  => {
  let product;
  try {
    const result = await dynamodb.get({
      TableName: process.env.PRODUCTS_TABLE_NAME,
      Key: { id },
    }).promise();
    product = result.Item;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  if (!product) {
    throw new createError.NotFound(`Product with ID "${id}" was not found!`);
  }
  return product;
};

const getAuction = async (event) => {
  const { id } = event.pathParameters;
  const product = await getProductById(id);
  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};

export const handler = commonMiddleware(getAuction);