import React, { ReactElement } from 'react';
import { fetchAuthN } from '../utils/api';
import { ProfileSchema } from './Profile';

export type AuthState = {
  isAuthenticated: boolean;
  authenticating: boolean;
  profile?: ProfileSchema;
  setProfile: (profile: ProfileSchema) => void;
};

const initialState: AuthState = {
  isAuthenticated: false,
  authenticating: true,
  profile: undefined,
  setProfile: () => undefined,
};

export const authContext = React.createContext(initialState);
const { Provider: AuthProvider } = authContext;

export type AuthAction = {
  type: 'SET_PROFILE' | 'AUTHENTICATING' | 'RESET';
  profile?: ProfileSchema;
};

function reducer(_state: AuthState, action: AuthAction) {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        ..._state,
        profile: action.profile,
        isAuthenticated: true,
        authenticating: false,
      };
    case 'AUTHENTICATING':
      return {
        ..._state,
        authenticating: true,
        isAuthenticated: false,
      };
    case 'RESET':
      return {
        ..._state,
        authenticating: false,
        isAuthenticated: false,
      };
    default:
      throw new Error('Invalid authentication type');
  }
}

type AuthProps = {
  children: React.ReactNode;
};

export function Auth(props: AuthProps): ReactElement {
  const { children } = props;
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setAuthenticating = () => dispatch({ type: 'AUTHENTICATING' });
  const setProfile = (profile: ProfileSchema) => dispatch({ type: 'SET_PROFILE', profile });
  const reset = () => dispatch({ type: 'RESET' });

  React.useEffect(() => {
    const exec = async () => {
      setAuthenticating();
      try {
        const profile = await fetchAuthN();
        setProfile(profile);
      } catch (error) {
        reset();
      }
    };
    exec();
  }, []);

  const data: AuthState = { ...state, setProfile };

  return <AuthProvider value={data}>{children}</AuthProvider>;
}
