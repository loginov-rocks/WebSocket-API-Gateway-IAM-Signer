# WebSocket API Gateway IAM Signer

WebSocket API Gateway IAM Signer.

Medium: https://loginov-rocks.medium.com/authorize-access-to-websocket-api-gateway-with-aws-signature-v4-f7e6b0e39f0a

## Quick Start

Deploy CloudFormation stack and upload functions source code (note .mjs extension instead of .js deployed by
CloudFormation by default) in Lambdas.

## Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "execute-api:Invoke",
      "Effect": "Allow",
      "Resource": "arn:aws:execute-api:us-east-1:1234567890:abc123/$default/*"
    }
  ]
}
```

Where:

* `us-east-1` - region,
* `1234567890` - account,
* `abc123` - API Gateway ID,
* `$default` - stage.

## wscat

```sh
npm install -g wscat
```

```sh
wscat -c 'wss://abc123.execute-api.us-east-1.amazonaws.com/$default'
```

## Reference

* https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-control-access-iam.html
* https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-signing.html

## Gists

1. https://gist.github.com/loginov-rocks/a572bf4013d77d96fa7dc885a8450734
