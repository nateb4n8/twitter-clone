import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({}));


function Profile(props) {
  const {
    primaryImageSrc, profileName, handle, location, joinDate,
  } = props;
  const classes = useStyles();

  return (
    <div>
      <img src={primaryImageSrc} alt={`${profileName} profile`} />
      <Typography component="h3">{profileName}</Typography>
      <Typography variant="body1" component="span">{handle}</Typography>
      <Typography variant="body1" component="span">{location}</Typography>
      <Typography variant="body1" component="span">{joinDate}</Typography>
    </div>
  );
}

Profile.propTypes = {
  primaryImageSrc: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  joinDate: PropTypes.string.isRequired,
};

export default Profile;
