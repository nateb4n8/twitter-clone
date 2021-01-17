import { ApolloProvider } from '@apollo/client';
import React, { ReactElement } from 'react';
import { useApolloClient } from '../../hooks/useApolloClient';
import { Auth } from '../AuthContext';
import { Routes } from '../Routes';
import { Session } from '../session/Session';
import { Theme } from '../Theme';

export function App(): ReactElement {
  const client = useApolloClient();
  return (
    <ApolloProvider client={client}>
      <Session>
        <Theme>
          <Auth>
            <Routes />
          </Auth>
        </Theme>
      </Session>
    </ApolloProvider>
  );
}
