import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import path from 'path';

export class HelloWorld extends Construct {
  public lambda: Function;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.lambda = new Function(this, 'HelloWorldFunction', {
      runtime: Runtime.NODEJS_22_X,
      code: Code.fromAsset(path.join(import.meta.dirname)),
      handler: 'main',
    });
  }
}
