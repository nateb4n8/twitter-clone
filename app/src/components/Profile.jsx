import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, Typography, Button, Grid,
} from '@material-ui/core';
import LocationIcon from '@material-ui/icons/Place';
import JoinDateIcon from '@material-ui/icons/DateRange';

const useStyles = makeStyles(theme => ({
  profileImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 120,
    height: 120,
    overflow: 'hidden',
    borderColor: 'rgba(0,0,0,0)',
    borderRadius: '50%',
    borderWidth: 10,
    borderStyle: 'solid',
    '& img': {
      maxWidth: '100%',
      height: 'auto',
    },
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
  profileName: {
    fontWeight: 600,
  },
  header: {
    height: 140,
  },
  headerBanner: {
    height: 70,
    backgroundColor: theme.palette.primary.main,
  },
}));

function Profile(props) {
  const {
    primaryImageSrc,
    profileName,
    handle,
    location,
    joinDate,
    followerAmt,
    followingAmt,
  } = props;
  const classes = useStyles();

  const outputHandle = `@${handle}`;
  const outputFollowing = `${followingAmt} Following`;
  const outputFollowers = `${followerAmt} Followers`;
  const outputJoinedDate = `Joined ${joinDate}`;

  return (
    <div style={{ backgroundColor: '#555' }}>
      <div className={classes.header}>
        <div className={classes.headerBanner} />
        <Grid container justify="flex-end" spacing={1}>
          <Button name="editProfile" variant="outlined" color="primary">Edit profile</Button>
        </Grid>
      </div>
      <div className={classes.profileImage}>
        <img src={primaryImageSrc} alt={`${profileName} profile`} />
      </div>
      <Grid container direction="column">
        <Grid item>
          <Typography component="h3" className={classes.profileName}>{profileName}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" component="span">{outputHandle}</Typography>
        </Grid>
        <Grid item container alignItems="center">
          <LocationIcon fontSize="small" />
          <Typography variant="body1" component="span" className={classes.marginRight}>
            {location}
          </Typography>
          <JoinDateIcon fontSize="small" />
          <Typography variant="body1" component="span">{outputJoinedDate}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" component="span" className={classes.marginRight}>
            {outputFollowing}
          </Typography>
          <Typography variant="body1" component="span">{outputFollowers}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

Profile.propTypes = {
  primaryImageSrc: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  joinDate: PropTypes.string.isRequired,
  followingAmt: PropTypes.number.isRequired,
  followerAmt: PropTypes.number.isRequired,
};

export default Profile;
