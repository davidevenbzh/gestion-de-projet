import {
  AUTH_USER_POOL_CLIENT_ID_EXPORT_NAME,
  AUTH_USER_POOL_ID_EXPORT_NAME,
} from '@gestion-de-projet/authentication-sdk';
import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { AccountRecovery, FeaturePlan, Mfa, UserPool } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class AuthStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const userPool = new UserPool(this, 'UserPool', {
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
      accountRecovery: AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
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

    const userPoolClient = userPool.addClient('AppClient', {
      userPoolClientName: 'app-client',
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
    });

    new CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
      description: 'ID of the Cognito User Pool',
      exportName: AUTH_USER_POOL_ID_EXPORT_NAME,
    });

    new CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
      description: 'ID of the Cognito User Pool Client',
      exportName: AUTH_USER_POOL_CLIENT_ID_EXPORT_NAME,
    });
  }
}
