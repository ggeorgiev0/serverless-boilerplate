import AWS from 'aws-sdk';
import validator from '@middy/validator';
import createError from 'http-errors';
import commonMiddleware from '../../lib/commonMiddleware';
import { getProductById } from './getProduct';
import updateProductInfoSchema from '../../lib/schemas/updateProductInfoSchema';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const updateProductInfo = async (event) => {
  const { id } = event.pathParameters;
  const {
    quantity,
    isActive,
    productType,
    isInKilos,
    expiryDate,
    costInRealCurrency,
    costInVirtualCurrency,
    productName,
  } = event.body.product;
  
  // To check if the product exists.
  const product = await getProductById(id);
  const {
    quantity: oldQuantity,
    isActive: oldIsActive,
    productType: oldProductType,
    isInKilos: oldIsInKilos,
    expiryDate: oldExpiryDate,
    costInRealCurrency: oldCostInRealCurrency,
    costInVirtualCurrency: oldCostInVirtualCurrency,
    productName: oldName,
  } = product;

  let updatedQuantity = oldQuantity;
  let updatedIsActive = oldIsActive;
  let updatedProductType = oldProductType;
  let updatedisInKilos = oldIsInKilos;
  let updatedExpiryDate = oldExpiryDate;
  let updatedCostInRealCurrency = oldCostInRealCurrency;
  let updatedCostInVirtualCurrency = oldCostInVirtualCurrency;
  let updatedName = oldName;

  if (quantity) updatedQuantity += quantity;
  if (isActive !== oldIsActive) updatedIsActive = isActive;
  if (productType && productType !== oldProductType) updatedProductType = productType;
  if (isInKilos !== oldIsInKilos) updatedisInKilos = isInKilos;
  if (expiryDate && new Date(expiryDate) !== new Date(oldExpiryDate)) updatedExpiryDate = new Date(expiryDate).toISOString();
  if (costInRealCurrency && costInRealCurrency !== oldCostInRealCurrency) updatedCostInRealCurrency = costInRealCurrency;
  if (costInVirtualCurrency && costInVirtualCurrency !== oldCostInVirtualCurrency) updatedCostInVirtualCurrency = costInVirtualCurrency;
  if (productName && productName !== oldName) updatedName = productName;

  const params = {
    TableName: process.env.PRODUCTS_TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set quantity = :quantity, isActive = :isActive, '
      + 'productType = :productType, '
      + 'isInKilos = :isInKilos, '
      + 'expiryDate = :expiryDate, '
      + 'costInRealCurrency = :costInRealCurrency, '
      + 'costInVirtualCurrency = :costInVirtualCurrency, '
      + 'productName = :productName',
    ExpressionAttributeValues: {
      ':quantity': updatedQuantity,
      ':isActive': updatedIsActive,
      ':productType': updatedProductType,
      ':isInKilos': updatedisInKilos,
      ':expiryDate': updatedExpiryDate,
      ':costInRealCurrency': updatedCostInRealCurrency,
      ':costInVirtualCurrency': updatedCostInVirtualCurrency,
      ':productName': updatedName,
    },
    ReturnValues: 'ALL_NEW',
  }

  let updatedProduct;

  try {
    const result = await dynamodb.update(params).promise();
    updatedProduct = result.Attributes;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedProduct),
  };
};

export const handler = commonMiddleware(updateProductInfo)
  .use(validator({ inputSchema: updateProductInfoSchema }));