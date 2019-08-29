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
        .then((p) => {
          setProfile({
            ...p,
            profileImageSrc: `//localhost:3001/assets/profileImages/${p.handle}`,
          });
        })
        .catch(() => setProfile({}));
    }
  }, [isAuthenticated]);

  const refreshProfileImage = () => {
    const { profileImageSrc } = profile;
    if (profileImageSrc) {
      const src = `${profileImageSrc.split('?')[0]}?${new Date().getTime()}`;
      setProfile({
        ...profile,
        profileImageSrc: src,
      });
    }
  };

  return (
    <Provider value={{ profile, refreshProfileImage }}>
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
