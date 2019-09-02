import React from 'react';
import PropTypes from 'prop-types';

import { fetchProfile } from '../utils/api';
import { authContext } from './AuthContext';

const context = React.createContext();
const { Provider } = context;

function Profile({ children }) {
  const { isAuthenticated } = React.useContext(authContext);
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchProfile()
        .then(setProfile)
        .catch(() => setProfile({}));
    }
  }, [isAuthenticated]);

  return (
    <Provider value={{ profile, setProfile }}>
      {children}
    </Provider>
  );
}
Profile.defaultProps = {
  children: null,
};
Profile.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export const profileContext = context;

export default Profile;
