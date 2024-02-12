# WebSocket API Gateway IAM Signer

WebSocket API Gateway IAM Signer.

## Quick Start

Deploy CloudFormation stack and upload functions source code (note .mjs extension instead of .js deployed by
CloudFormation by default) in Lambdas.

## Lambda Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "execute-api:Invoke",
      "Effect": "Allow",
      "Resource": "arn:aws:execute-api:us-east-1:1234567890:abc123/production/*"
    }
  ]
}
```

Where:

* `us-east-1` - region,
* `1234567890` - account,
* `abc123` - API Gateway ID,
* `production` - stage.

## wscat

```sh
npm install -g wscat
```

```sh
wscat -c 'wss://abc123.execute-api.us-east-1.amazonaws.com/$default'
```

## Reference

* https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-authenticating-requests.html
* https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-auth-using-authorization-header.html
* https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
