# babel-lambda-skeleton [![Build Status](https://travis-ci.org/larseen/babel-lambda-skeleton.svg?branch=master)](https://travis-ci.org/larseen/babel-lambda-skeleton)  [![Coverage Status](https://coveralls.io/repos/github/larseen/babel-lambda-skeleton/badge.svg?branch=master)](https://coveralls.io/github/larseen/babel-lambda-skeleton?branch=master)

`babel-lambda-skeleton` is meant to be all the necessary boilerplate needed for you to get started creating, testing and deploying Lambda functions to Amazon Web Services.

This configuration enables you to write and test your lambda functions in ES6, and compiling them using  Babel. The code is easily uploaded to AWS using the `aws-cli`.

## Build

```sh
$ npm run build
```
This functions compiles and compresses your code into an zip file which you later can upload, both manually and automatically.

## Configuration

To upload automatically to AWS you need to configure your lambda functions in the file `lambda.json`.

### Example configuration

Valid JSON cannot contain comments, so remember to remove them first.
```js
{
	// The name you want to assign to the function you are uploading
    "FunctionName": "babel-lambda-skeleton",
	// The runtime environment for the Lambda function you are uploading.
    "Runtime": "nodejs4.3",
 	// The ARN of the IAM role that Lambda assumes when it executes your function
    "Role": "arn:aws:iam::775479825196:role/lambda",
	// The function within your code that Lambda calls to begin execution.
    "Handler": "dist.default",
	// A short, user-defined function description.
    "Description": "An basic AWS Lambda function",
	// The function execution time at which Lambda should terminate the function.
    "Timeout": 3,
	// The amount of memory, in MB, your Lambda function is given.
    "MemorySize": 128,
 	// Create the Lambda function and publish a version as an atomic operation.
    "Publish": true
}
```
For more information see the DOCS for the [AWS CLI](http://docs.aws.amazon.com/cli/latest/reference/lambda/index.html#cli-aws-lambda).

## Deploy to AWS

The deploy script will create the Lambda function for you in AWS with the compiled code and the specified configurations. If the function already exists, it will publish a new version with the updated code and configurations.

To be able to deploy automatically to AWS you need to have installed the `aws-cli` and configured it to use the the account you wish to upload the function to.

```sh
$ npm run deploy
```

## Styleguide

```sh
$ npm run lint
```

## Tests

Run the tests with:
```sh
$ npm test
```

## License

(The MIT License)

Copyright (c) 2015 Kristoffer K Larsen <kristoffer@larsen.so>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
