import React, { ReactElement, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { authContext } from './AuthContext';
import { fetchProfile } from '../utils/api';
import { Profile, ProfileSchema } from './Profile';
import { FixMeLater } from '..';

type ProfileDataProps = {
  match: { params: { handle: string } };
};

export function ProfileData(props: ProfileDataProps): ReactElement {
  const { match } = props;
  const [profileToRender, setProfileToRender] = useState<ProfileSchema>();
  const [handleNotFound, setHandleNotFound] = useState(false);

  const { profile: currUserProfile } = useContext(authContext);
  const { handle: currUserHandle = '' } = currUserProfile || {};

  const { handle: pathHandle } = match.params;

  const isCurrentUser = currUserHandle === pathHandle;
  const handle = isCurrentUser ? currUserHandle : pathHandle;

  useEffect(() => {
    const exec = async () => {
      if (isCurrentUser) {
        setProfileToRender(currUserProfile);
      } else {
        try {
          const profile: FixMeLater = fetchProfile(handle);
          setProfileToRender(profile);
        } catch (error) {
          setHandleNotFound(true);
        }
      }
    };
    exec();
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
