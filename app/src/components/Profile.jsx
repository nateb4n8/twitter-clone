import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography,
  Grid,
  Fab,
} from '@material-ui/core';
import {
  Link as LinkIcon,
  Place as LocationIcon,
  DateRange as JoinDateIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  PersonAdd as PersonAddIcon,
} from '@material-ui/icons';
import EditProfile from './EditProfile';
import { profileContext } from './ProfileContext';
import { fetchProfile } from '../utils/api';


const useStyles = makeStyles((theme) => {
  const imgHeight = 120;
  const borderWidth = theme.spacing(1);

  return {
    marginRight: {
      marginRight: theme.spacing(2),
    },
    profileName: {
      fontWeight: 600,
    },
    backgroundBanner: {
      width: '100%',
      height: 160,
      background: ({ bannerImg }) => `center / cover no-repeat url(${bannerImg})`,
    },
    profImg: {
      marginTop: -(imgHeight / 2 + borderWidth + theme.spacing(2)),
      borderWidth,
      width: imgHeight,
      height: imgHeight,
      overflow: 'hidden',
      borderColor: 'rgba(0,0,0,0)',
      borderRadius: '50%',
      borderStyle: 'solid',
      backgroundColor: 'grey',
    },
  };
});

function ProfileNotFound({ unknownHandle }) {
  const classes = useStyles({
    bannerImg: `//localhost:3001/assets/bannerImage/${unknownHandle}`,
  });
  return (
    <div>
      <div className={classes.backgroundBanner} />
      <div style={{ padding: 16 }}>
        <Grid container spacing={2}>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <img
                  src={`//localhost:3001/assets/profileImage/${unknownHandle}`}
                  alt="profile not found"
                  className={classes.profImg}
                />
              </Grid>
              <Grid item>
                <Typography variant="body1" component="span">{`@${unknownHandle}`}</Typography>
              </Grid>
              <Grid item>
                <Typography align="center" variant="body1">This account does not exist</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
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
  const classes = useStyles({
    bannerImg: `//localhost:3001/assets/bannerImage/${profile.handle}`,
  });

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
      <Grid container justify="flex-end">
        <Fab
          name="editProfile"
          aria-label="edit profile"
          color="primary"
          onClick={() => setEditOpen(true)}
        >
          <EditIcon />
        </Fab>
        <EditProfile open={editOpen} onClose={() => setEditOpen(false)} />
      </Grid>
    );
  }
  else {
    profileMenu = (
      <Grid container justify="flex-end" spacing={1}>
        <Grid item>
          <Fab
            name=""
            aria-label="follow user"
            color="primary"
          >
            <PersonAddIcon />
          </Fab>
        </Grid>
        <Grid item>
          <Fab
            name=""
            aria-label="share user"
            color="primary"
          >
            <ShareIcon />
          </Fab>
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <div className={classes.backgroundBanner} />
      <div style={{ padding: 16 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Grid container direction="column">
              <Grid item>
                <img
                  src={`//localhost:3001/assets/profileImage/${handle}`}
                  alt={`${name} profile`}
                  className={classes.profImg}
                />
              </Grid>
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
          </Grid>
          <Grid item xs={3}>
            {profileMenu}
          </Grid>
        </Grid>
      </div>
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
