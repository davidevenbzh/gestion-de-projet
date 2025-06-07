import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USERS_POOL_ID ?? '',
      userPoolClientId: import.meta.env.VITE_COGNITO_USERS_POOL_CLIENT_ID ?? '',
    },
  },
});

export function App() {
  return (
    <Authenticator hideSignUp>
      {({ signOut, user }) => (
        <main>
          <h1>Bonjour {user?.username}</h1>
          <button onClick={signOut}>Déconnexion</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
