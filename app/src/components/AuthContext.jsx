import React from 'react';
import PropTypes from 'prop-types';

import { fetchAuthN } from '../utils/api';

const context = React.createContext();
const { Provider: AuthProvider } = context;

function Auth({ children }) {
  const [isAuthenticated, setAuthN] = React.useState(false);
  const [authenticating, setAuthenticating] = React.useState(true);

  React.useEffect(() => {
    setAuthN(false);
    setAuthenticating(true);

    fetchAuthN()
      .then(() => setAuthN(true))
      .catch(console.error)
      .finally(() => setAuthenticating(false));
  }, []);

  return (
    <AuthProvider value={{ isAuthenticated, authenticating, setAuthN }}>
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
