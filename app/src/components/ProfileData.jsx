import React from 'react';
import PropTypes from 'prop-types';
import { authContext } from './AuthContext';
import { fetchProfile } from '../utils/api';
import Profile from './Profile';

function ProfileData({ match }) {
  const [profileToRender, setProfileToRender] = React.useState({});
  const [handleNotFound, setHandleNotFound] = React.useState(false);

  const { profile: currUserProfile } = React.useContext(authContext);
  const { handle: currUserHandle } = currUserProfile;

  const { handle: pathHandle } = match.params;

  const isCurrentUser = currUserHandle === pathHandle;
  const handle = isCurrentUser ? currUserHandle : pathHandle;

  React.useEffect(() => {
    if (isCurrentUser) {
      setProfileToRender(currUserProfile);
    }
    else {
      fetchProfile(handle)
        .then(setProfileToRender)
        .catch(() => setHandleNotFound(true));
    }
  }, [handle, isCurrentUser, currUserProfile]);

  return (
    <Profile
      {...profileToRender}
      handle={pathHandle}
      isCurrentUser={isCurrentUser}
      handleNotFound={handleNotFound}
    />
  );
}
ProfileData.defaultProps = {
  match: { params: { handle: '' } },
};
ProfileData.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      handle: PropTypes.string,
    }),
  }),
};

export default ProfileData;
