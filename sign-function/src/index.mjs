import { defaultProvider } from '@aws-sdk/credential-provider-node';

import { sign } from './sign.mjs';

// Environment variable provided by AWS.
const AWS_REGION = process.env.AWS_REGION;

// Set up custom access key ID and secret access key environment variables to use custom identity.
const credentials = process.env.CUSTOM_ACCESS_KEY_ID && process.env.CUSTOM_SECRET_ACCESS_KEY ? {
  accessKeyId: process.env.CUSTOM_ACCESS_KEY_ID,
  secretAccessKey: process.env.CUSTOM_SECRET_ACCESS_KEY,
} : defaultProvider();

// Environment variable injected by CloudFormation.
const WEBSOCKET_API_URL = process.env.WEBSOCKET_API_URL;

export const handler = async (event) => {
  console.log('event', JSON.stringify(event));

  let requestedAuthMethod, requestedHeaders, requestedQuery, requestedUrl;

  if (event.body) {
    try {
      const body = JSON.parse(event.body);

      console.log('body', JSON.stringify(body));

      requestedAuthMethod = body.authMethod;
      requestedHeaders = body.headers;
      requestedQuery = body.query;
      requestedUrl = body.url;
    } catch (error) {
      console.error('error', JSON.stringify(error));

      return { statusCode: 400 };
    }
  }

  // Fallbacks.
  const authMethod = requestedAuthMethod ? requestedAuthMethod : 'header';
  const url = requestedUrl ? requestedUrl : WEBSOCKET_API_URL;

  // Provide additional query parameters based on requirements.
  const query = {
    ...requestedQuery,
    // customQueryParameter: 'customQueryParameterValue',
  };

  // Provide additional headers based on requirements.
  const headers = {
    ...requestedHeaders,
    // customHeader: 'customHeaderValue',
  };

  let response;
  try {
    response = await sign(AWS_REGION, credentials, authMethod, url, query, headers);
  } catch (error) {
    console.error('error', JSON.stringify(error));

    return { statusCode: 500 };
  }

  const responseJson = JSON.stringify(response);

  console.log('responseJson', responseJson);

  return {
    body: responseJson,
    headers: {
      'content-type': 'application/json',
    },
    statusCode: 201,
  };
};
