import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      region: import.meta.env.VITE_AWS_REGION,
      userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID,
      identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID,
    }
  },
  Storage: {
    S3: {
      region: import.meta.env.VITE_AWS_REGION,
      bucket: import.meta.env.VITE_AWS_BUCKET,
    }
  },
  API: {
    GraphQL: {
      endpoint: import.meta.env.VITE_AWS_APPSYNC_API_URL,
      region: import.meta.env.VITE_AWS_REGION,
      defaultAuthMode: 'userPool',
    }
  }
});