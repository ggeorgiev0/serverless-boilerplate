import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import createError from 'http-errors';
import validator from '@middy/validator';
import commonMiddleware from '../../lib/commonMiddleware';
import createProductSchema from '../../lib/schemas/createProductSchema';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const createProduct = async (event) => {
  const {
    name,
    quantity,
    isInKilos,
    costInRealCurrency,
    costInVirtualCurrency,
    productType,
  } = event.body;

  if (productType !== 'beverage' && productType !== 'snack' && productType !== 'cookable') {
    throw new createError.Forbidden('Product type should either be a beverage, snack or cookable!');
  }

  let { expiryDate } = event.body;
  const defaultExpiryDate = new Date();
  defaultExpiryDate.setDate(defaultExpiryDate.getDate() + 1);
  expiryDate = expiryDate || defaultExpiryDate;

  const product = {
    id: uuid(),
    name,
    quantity,
    expiryDate,
    isInKilos,
    productType,
    costInRealCurrency,
    costInVirtualCurrency,
  };

  try {
    await dynamodb
      .put({
        TableName: process.env.PRODUCTS_TABLE_NAME,
        Item: product,
      })
      .promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(product),
  };
};

export const handler = commonMiddleware(createProduct).use(
  validator({ inputSchema: createProductSchema }),
);
