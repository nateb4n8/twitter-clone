import React from 'react';
import PropTypes from 'prop-types';

import { fetchAuthN } from '../utils/api';

const context = React.createContext();
const { Provider: AuthProvider } = context;

const initialState = {
  isAuthenticated: false,
  authenticating: true,
  profile: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        profile: action.profile,
        isAuthenticated: true,
        authenticating: false,
      };
    case 'AUTHENTICATING':
      return {
        authenticating: true,
        isAuthenticated: false,
        profile: null,
      };
    case 'RESET':
      return {
        authenticating: false,
        isAuthenticated: false,
        profile: null,
      };
    default:
      throw new Error('Invalid authentication type');
  }
}

function Auth({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setAuthenticating = () => dispatch({ type: 'AUTHENTICATING' });
  const setProfile = profile => dispatch({ type: 'SET_PROFILE', profile });
  const reset = () => dispatch({ type: 'RESET' });

  React.useEffect(() => {
    setAuthenticating();

    fetchAuthN()
      .then(setProfile)
      .catch(reset);
  }, []);

  const data = {
    ...state,
    setProfile,
  };

  return (
    <AuthProvider value={data}>
      {children}
    </AuthProvider>
  );
}

Auth.defaultProps = {
  children: null,
};

Auth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export const authContext = context;

export default Auth;
