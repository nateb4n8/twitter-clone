import React from 'react';
// import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import {
  Link as LinkIcon,
  Place as LocationIcon,
  DateRange as JoinDateIcon,
} from '@material-ui/icons';

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
  const [editOpen, setEditOpen] = React.useState(false);
  const classes = useStyles();

  const { profile } = React.useContext(profileContext);

  const {
    name: profileName,
    handle,
    location,
    followerCount,
    followingCount,
    profileImageSrc,
    joinDate,
  } = profile;

  const outputHandle = `@${handle}`;
  const outputFollowing = `${followingCount} Following`;
  const outputFollowers = `${followerCount} Followers`;

  const dateString = new Date(joinDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const outputJoinedDate = `Joined ${dateString}`;

  const { website } = profile;
  let websiteDisplayText = website;
  if (website) {
    // remove protocol if present
    if (website.startsWith('http://')) websiteDisplayText = website.slice(7);
    else if (website.startsWith('https://')) websiteDisplayText = website.slice(8);
    // remove www if present
    if (websiteDisplayText.startsWith('www')) websiteDisplayText = websiteDisplayText.slice(4);
  }

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
            {location && (
              <Grid item container alignItems="center">
                <LocationIcon fontSize="small" />
                <Typography variant="body1" component="span" className={classes.marginRight}>
                  {location}
                </Typography>
              </Grid>
            )}
            {website && (
              <Grid item container alignItems="center">
                <LinkIcon fontSize="small" />
                <Typography variant="body1" className={classes.marginRight} component="a" href={website} target="_blank">
                  {websiteDisplayText}
                </Typography>
              </Grid>
            )}
            {joinDate && (
              <Grid item container alignItems="center">
                <JoinDateIcon fontSize="small" />
                <Typography variant="body1" component="span">
                  {outputJoinedDate}
                </Typography>
              </Grid>
            )}
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
