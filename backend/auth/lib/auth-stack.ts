import * as cdk from 'aws-cdk-lib';
import { FeaturePlan, Mfa, UserPool } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AuthStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new UserPool(this, 'UserPool', {
      userPoolName: 'user-pool',
      signInCaseSensitive: false,
      userInvitation: {
        emailSubject: 'Bienvenue sur votre application de gestion de projet !',
        emailBody:
          'Bonjour {username}, vous avez été invité(e) à rejoindre notre application ! Votre mot de passe temporaire est {####}',
        smsMessage:
          'Bonjour {username}, votre mot de passe temporaire pour notre application est {####}',
      },
      signInAliases: {
        username: true,
      },
      featurePlan: FeaturePlan.LITE,
      mfa: Mfa.OFF,
      selfSignUpEnabled: true,
      accountRecovery: cdk.aws_cognito.AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        phoneNumber: {
          required: false,
          mutable: true,
        },
      },
      deletionProtection: false,
    });
  }
}
