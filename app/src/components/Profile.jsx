import React from 'react';
import PropTypes from 'prop-types';
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
import { fetchProfile } from '../utils/api';


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
    backgroundColor: 'grey',
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

function ProfileNotFound({ unknownHandle }) {
  const classes = useStyles();
  return (
    <div style={{ backgroundColor: '#555' }}>
      <div className={classes.header}>
        <div className={classes.headerBanner} />
      </div>
      <div className={classes.profileImage} />
      <Grid container direction="column">
        <Grid item>
          <Typography variant="body1" component="span">{`@${unknownHandle}`}</Typography>
        </Grid>
        <Grid item>
          <Typography align="center" variant="body1">This account does not exist</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
ProfileNotFound.propTypes = {
  unknownHandle: PropTypes.string.isRequired,
};

function Profile({ match }) {
  const [editOpen, setEditOpen] = React.useState(false);
  const [profile, setProfile] = React.useState({});
  const [handleNotFound, setHandleNotFound] = React.useState(false);
  const classes = useStyles();

  const { profile: currUserProfile } = React.useContext(profileContext);
  const { handle: currUserHandle } = currUserProfile;

  const { handle: pathHandle } = match.params;
  const isCurrentUser = currUserHandle === pathHandle;

  const profileHandle = isCurrentUser ? currUserHandle : pathHandle;
  React.useEffect(() => {
    fetchProfile(profileHandle)
      .then(setProfile)
      .catch(() => setHandleNotFound(true));
  }, [profileHandle]);

  const {
    name,
    handle,
    location,
    followerCount,
    followingCount,
    profileImageSrc,
    joinDate,
  } = profile;

  const dateString = new Date(joinDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const outputJoinedDate = `Joined ${dateString}`;

  const { website } = profile;
  let websiteDisplayText = website;
  if (website) {
    // remove protocol if present
    if (website.startsWith('http://')) {
      websiteDisplayText = website.slice(7);
    }
    else if (website.startsWith('https://')) {
      websiteDisplayText = website.slice(8);
    }

    // remove www if present
    if (websiteDisplayText.startsWith('www')) {
      websiteDisplayText = websiteDisplayText.slice(4);
    }
  }

  let profileMenu;
  if (handleNotFound) {
    return <ProfileNotFound unknownHandle={profileHandle} />;
  }

  if (isCurrentUser) {
    profileMenu = (
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
    );
  }
  else {
    profileMenu = (
      <Grid container justify="flex-end" spacing={1}>
        <Button
          name=""
          variant="outlined"
          color="primary"
        >
        Share Link
        </Button>
        <Button
          name=""
          variant="outlined"
          color="primary"
        >
        Follow
        </Button>
      </Grid>
    );
  }

  return (
    <div style={{ backgroundColor: '#555' }}>
      <div className={classes.header}>
        <div className={classes.headerBanner} />
        { profileMenu }
      </div>
      <div className={classes.profileImage}>
        {profileImageSrc && <img src={profileImageSrc} alt={`${name} profile`} />}
      </div>
      <Grid container direction="column">
        <Grid item>
          <Typography component="h3" className={classes.profileName}>{name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" component="span">{`@${handle}`}</Typography>
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
                <Typography
                  variant="body1"
                  className={classes.marginRight}
                  component="a"
                  href={website}
                  target="_blank"
                >
                  {websiteDisplayText}
                </Typography>
              </Grid>
            )}
            <Grid item container alignItems="center">
              <JoinDateIcon fontSize="small" />
              <Typography variant="body1" component="span">
                {outputJoinedDate}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body1" component="span" className={classes.marginRight}>
            {`${followingCount} Following`}
          </Typography>
          <Typography variant="body1" component="span">
            {`${followerCount} Followers`}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
Profile.defaultProps = {
  match: { params: { handle: '' } },
};
Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      handle: PropTypes.string,
    }),
  }),
};

export default Profile;
