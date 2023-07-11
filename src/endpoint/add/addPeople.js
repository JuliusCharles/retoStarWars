const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB();
const tableName = process.env.DYNAMODB_TABLE;

module.exports.handler = async (event) => {  
  const { body } = event;
  const { id, name } = JSON.parse(body);

  const params = {
    TableName: tableName,
    Item: { id: { N: id.toString() }, name: { S: name } },
  };

  try {

    await dynamoDB.putItem(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item created successfully' }),
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};