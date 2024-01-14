import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const CONNECTIONS_TABLE_NAME = process.env.CONNECTIONS_TABLE_NAME;

const dynamoDbClient = new DynamoDBClient({});
const dynamoDbDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);

export const handler = async (event) => {
  console.log('event', JSON.stringify(event));

  const { connectionId } = event.requestContext;

  const getCommand = new GetCommand({
    Key: { connectionId },
    TableName: CONNECTIONS_TABLE_NAME,
  });

  let getCommandResponse;
  try {
    getCommandResponse = await dynamoDbDocumentClient.send(getCommand);
  } catch (error) {
    console.error('error', JSON.stringify(error));

    return { statusCode: 500 };
  }

  console.log('getCommandResponse', JSON.stringify(getCommandResponse));

  if (!getCommandResponse.Item) {
    return { statusCode: 404 };
  }

  // TODO

  return { statusCode: 204 };
};
