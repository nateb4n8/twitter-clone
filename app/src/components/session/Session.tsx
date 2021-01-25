import React, { createContext, useContext, useState } from 'react';
import { User } from '../../generated/graphql';

type SessionContext = {
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  accessToken?: string;
  user?: User;
};

const sessionContext = createContext<SessionContext>({
  setAccessToken: (): void => undefined,
  setUser: (): void => undefined,
});

type SessionProps = { children: React.ReactNode };

export function Session({ children }: SessionProps) {
  const [accessToken, setAccessToken] = useState<string>();
  const [user, setUser] = useState<User>();

  const value: SessionContext = {
    setAccessToken,
    setUser,
    accessToken,
    user,
  };

  return <sessionContext.Provider value={value}>{children}</sessionContext.Provider>;
}

export const useSessionContext = () => useContext(sessionContext);
