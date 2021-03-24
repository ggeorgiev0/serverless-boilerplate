import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const setPictureUrl = async (id, pictureUrl) => {
  const params = {
    TableName: process.env.PRODUCTS_TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set pictureUrl = :pictureUrl',
    ExpressionAttributeValues: {
      ':pictureUrl': pictureUrl,
    },
    ReturnValues: 'ALL_NEW',
  };

  const result = await dynamodb.update(params).promise();
  return result.Attributes;
};
