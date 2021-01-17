import React, { createContext, useContext, useState } from 'react';
import { Login, User } from '../../generated/graphql';

type SessionContext = {
  setLogin: (login: Login) => void;
  accessToken?: string;
  user?: User;
};

const sessionContext = createContext<SessionContext>({
  setLogin: (): void => undefined,
});

type SessionProps = { children: React.ReactNode };

export function Session({ children }: SessionProps) {
  const [login, setLogin] = useState<Login>();

  const value: SessionContext = {
    setLogin,
    accessToken: login?.accessToken,
    user: login?.user,
  };

  return <sessionContext.Provider value={value}>{children}</sessionContext.Provider>;
}

export const useSessionContext = () => useContext(sessionContext);
