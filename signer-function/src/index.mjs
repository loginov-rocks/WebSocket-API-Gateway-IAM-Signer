import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { Hash } from '@aws-sdk/hash-node';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { URL } from 'url';

const AWS_REGION = process.env.AWS_REGION;

export const handler = async (event) => {
  console.log('event', JSON.stringify(event));

  const { url, headers } = event;

  const urlObject = new URL(url);

  const httpRequest = new HttpRequest({
    headers: {
      ...headers,
      host: urlObject.hostname,
    },
    hostname: urlObject.hostname,
    path: urlObject.pathname,
    protocol: urlObject.protocol,
    query: Object.fromEntries(urlObject.searchParams),
  });

  const signatureV4 = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'execute-api',
    sha256: Hash.bind(null, 'sha256'),
  });

  const signedHttpRequest = await signatureV4.sign(httpRequest);

  return {
    statusCode: 200,
    body: JSON.stringify({
      url: urlObject,
      headers: {
        ...headers,
        ...signedHttpRequest.headers,
      },
    }),
  };
};
