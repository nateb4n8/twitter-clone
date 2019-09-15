import React from 'react';
import PropTypes from 'prop-types';

import { fetchAuthN } from '../utils/api';

const context = React.createContext();
const { Provider: AuthProvider } = context;

function Auth({ children }) {
  const [isAuthenticated, setAuthN] = React.useState(false);
  const [authenticating, setAuthenticating] = React.useState(true);
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    setAuthN(false);
    setAuthenticating(true);

    fetchAuthN()
      .then((p) => {
        setAuthN(true);
        setProfile(p);
      })
      .catch(console.error)
      .finally(() => setAuthenticating(false));
  }, []);

  const data = {
    setAuthN,
    isAuthenticated,
    authenticating,
    profile,
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
