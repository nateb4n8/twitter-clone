import React from 'react';
// import PropTypes from 'prop-types';
import {
  makeStyles, Typography, Button, Grid,
} from '@material-ui/core';
import LocationIcon from '@material-ui/icons/Place';
import JoinDateIcon from '@material-ui/icons/DateRange';

import EditProfile from './EditProfile';
import { profileContext } from './ProfileContext';

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
      width: '100%',
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

function Profile() {
  const { profile } = React.useContext(profileContext);

  const [profileImageSrc, setProfileImageSrc] = React.useState('');
  const [profileName, setProfileName] = React.useState('');
  const [handle, setHandle] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [followerAmt, setFollowerAmt] = React.useState(0);
  const [followingAmt, setFollowingAmt] = React.useState(0);
  const [joinDate, setJoinDate] = React.useState('');
  const [editOpen, setEditOpen] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    setProfileName(profile.name);
    setHandle(profile.handle);
    setLocation(profile.location);
    setProfileImageSrc(profile.profileImageSrc);
    setFollowerAmt(profile.followerCount);
    setFollowingAmt(profile.followingCount);
    setJoinDate(profile.joinDate);
  }, [profile]);

  const outputHandle = `@${handle}`;
  const outputFollowing = `${followingAmt} Following`;
  const outputFollowers = `${followerAmt} Followers`;

  const dateString = new Date(joinDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const outputJoinedDate = `Joined ${dateString}`;

  return (
    <div style={{ backgroundColor: '#555' }}>
      <div className={classes.header}>
        <div className={classes.headerBanner} />
        <Grid container justify="flex-end" spacing={1}>
          <Button
            name="editProfile"
            variant="outlined"
            color="primary"
            onClick={() => setEditOpen(true)}
          >
            Edit profile
          </Button>
          <EditProfile open={editOpen} onClose={() => setEditOpen(false)} />
        </Grid>
      </div>
      <div className={classes.profileImage}>
        <img src={profileImageSrc} alt={`${profileName} profile`} />
      </div>
      <Grid container direction="column">
        <Grid item>
          <Typography component="h3" className={classes.profileName}>{profileName}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" component="span">{outputHandle}</Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            {location && <LocationIcon fontSize="small" /> }
            {location && <Typography variant="body1" component="span" className={classes.marginRight}>{location}</Typography>}
            {joinDate && <JoinDateIcon fontSize="small" />}
            {joinDate && <Typography variant="body1" component="span">{outputJoinedDate}</Typography>}
          </Grid>
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

export default Profile;
