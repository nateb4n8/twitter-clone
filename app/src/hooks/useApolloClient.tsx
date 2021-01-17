import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { useState } from 'react';

export function useApolloClient(): ApolloClient<NormalizedCacheObject> {
  const [client] = useState(
    new ApolloClient({
      uri: 'http://localhost:3001/graphql',
      cache: new InMemoryCache(),
    }),
  );
  return client;
}
