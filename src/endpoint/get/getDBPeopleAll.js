const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE;

module.exports.handler = async () => {
  const params = {
    TableName: tableName,
  };

  try {
    const result = await dynamoDB.scan(params).promise();

    if (result.Items) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'No items found' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};