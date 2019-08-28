import React from 'react';
import PropTypes from 'prop-types';

import { fetchAuthN } from '../utils/api';

const context = React.createContext();
const { Provider: AuthProvider } = context;

function Auth({ children }) {
  const [isAuthenticated, setAuthN] = React.useState(false);

  React.useEffect(() => {
    setAuthN(false);

    fetchAuthN()
      .then(() => setAuthN(true))
      .catch(console.error);
  }, []);

  return (
    <AuthProvider value={{ isAuthenticated, setAuthN }}>
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
