import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Layout } from './components/Layout';
import { GoalProvider } from './context/GoalContext';
import '@aws-amplify/ui-react/styles.css';
import './config/amplify';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <GoalProvider>
          <Layout user={user} onSignOut={signOut} />
        </GoalProvider>
      )}
    </Authenticator>
  );
}

export default App;