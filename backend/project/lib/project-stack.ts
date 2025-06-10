import * as cdk from 'aws-cdk-lib';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class ProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new RestApi(this, 'ProjectApi', {
      restApiName: 'project-api',
      description: 'api who will request handle project request',
    });
  }
}
