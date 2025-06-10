import { AUTH_USER_POOL_ID_EXPORT_NAME } from '@gestion-de-projet/authentication-sdk';
import { Fn, Stack, StackProps } from 'aws-cdk-lib';
import { CognitoUserPoolsAuthorizer, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import { HelloWorld } from '../src/functions/config';

export class ProjectStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const userPoolId = Fn.importValue(AUTH_USER_POOL_ID_EXPORT_NAME);

    const userPool = UserPool.fromUserPoolId(this, 'UserPool', userPoolId);

    const restApi = new RestApi(this, 'ProjectApi', {
      restApiName: 'project-api',
      description: 'api who will request handle project request',
    });

    const cognitoAuthorizer = new CognitoUserPoolsAuthorizer(this, 'CognitoAuthorizer', {
      cognitoUserPools: [userPool],
    });

    restApi.root.addMethod('GET', undefined, {
      authorizer: cognitoAuthorizer,
      operationName: 'GetProject',
    });

    const helloWorldFunction = new HelloWorld(this, 'HelloWorldFunction');

    const helloWorldIntegration = new LambdaIntegration(helloWorldFunction.lambda);

    restApi.root.addResource('hello').addMethod('GET', helloWorldIntegration, {
      operationName: 'HelloWorld',
      authorizer: cognitoAuthorizer,
    });
  }
}
