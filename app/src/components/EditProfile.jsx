import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme, withStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import CameraIcon from '@material-ui/icons/CameraAltOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';
import _ from 'lodash';
import { authContext } from './AuthContext';
import { fetchUpdateProfile } from '../utils/api';
import { bannerImagePath, profileImagePath } from '../utils/config';

const ThemedLinearProgress = withStyles(theme => ({
  colorPrimary: {
    backgroundColor: theme.palette.secondary.main,
  },
  barColorPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => {
  const imgHeight = 120;
  const borderWidth = 0; // theme.spacing(1);

  return {
    dialog: {
      borderRadius: '50%',
    },
    form: {
      padding: 30,
    },
    content: {
      padding: 12,
    },
    paper: {
      borderRadius: 12,
    },
    save: {
      textTransform: 'none',
      padding: '0px 8px',
    },
    profileImage: ({ src }) => ({
      margin: 0,
      width: 100,
      height: 100,
      overflow: 'hidden',
      borderColor: 'rgba(0,0,0,0)',
      borderRadius: '50%',
      borderStyle: 'solid',
      borderWidth: 0,
      background: `center grey / cover no-repeat url("${src}")`,
      '& button': {
        color: '#fff',
      },
    }),
    header: {
      padding: theme.spacing(1),
      background: 'linear-gradient(blueviolet 50%, transparent 50%)',
    },
    hidden: {
      display: 'none',
    },
    loadingRoot: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
    },

    // NEW NEW NEW
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
      background: ({ src }) => `center grey / cover no-repeat url(${src})`,
      '& button': {
        color: '#fff',
      },
    },
  };
});


function TextInput({ label, onChange, value = '', max = 10 }) {
  return (
    <Grid container justify="flex-end">
      <TextField
        variant="filled"
        name={label.toLowerCase()}
        fullWidth
        label={label}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={`Add your ${label.toLowerCase()}`}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Typography variant="caption" color="inherit">
        {`${value.length}/${max}`}
      </Typography>
    </Grid>
  );
}

function EditProfile({ open, onClose }) {
  const { profile, setProfile } = React.useContext(authContext);

  const [profileImageSrc, setProfileImageSrc] = React.useState(`${profileImagePath}${profile.handle}`);
  const [profileImageFile, setProfileImageFile] = React.useState(null);
  const [bannerImageSrc, setBannerImageSrc] = React.useState(`${bannerImagePath}${profile.handle}`);
  const [bannerImageFile, setBannerImageFile] = React.useState(null);
  const [nextName, setNextName] = React.useState(profile.name);
  const [nextHandle, setNextHandle] = React.useState(profile.handle);
  const [nextLocation, setNextLocation] = React.useState(profile.location);
  const [nextWebsite, setNextWebsite] = React.useState(profile.website);

  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const theme = useTheme();
  const classes = useStyles({
    src: profileImageSrc,
    bannerImg: bannerImageSrc,
  });
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const paperProps = fullScreen ? {} : { className: classes.paper };

  const reset = () => {
    setNextName(profile.name);
    setNextHandle(profile.handle);
    setNextLocation(profile.location);
    setNextWebsite(profile.website);
    setProfileImageSrc(`${profileImagePath}${profile.handle}`);
    setBannerImageSrc(`${bannerImagePath}${profile.handle}`);
  };

  const handleSave = async () => {
    const nextProfile = {
      ...profile,
      name: nextName,
      handle: nextHandle,
      location: nextLocation,
      website: nextWebsite,
      portraitUrl: profileImageSrc,
      bannerUrl: bannerImageSrc,
    };

    if (_.isEqual(profile, nextProfile) === false) {
      nextProfile.profileImage = profileImageFile;
      nextProfile.bannerImage = bannerImageFile;

      let payload = _.pick(nextProfile, [
        'name', 'handle', 'location', 'website', 'profileImage', 'bannerImage',
      ]);
      payload = _.omitBy(payload, _.isNil);

      setLoading(true);
      const res = await fetchUpdateProfile(payload).catch(setError);
      setLoading(false);

      if (error) return console.error(error);

      let { profileImageId, bannerImageId } = profile;
      if (profileImageFile) {
        profileImageId = new Date().getTime();
      }
      if (bannerImageFile) {
        bannerImageId = new Date().getTime();
      }

      setProfile({
        ...profile,
        ...res,
        profileImageId,
        bannerImageId,
      });
    }

    onClose();
  };

  const handleImageChange = (e) => {
    const { files, id } = e.target;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (id === 'profile-image-edit-button') {
          setProfileImageSrc(event.target.result);
          setProfileImageFile(files[0]);
        }
        else if (id === 'banner-edit-button') {
          setBannerImageSrc(event.target.result);
          setBannerImageFile(files[0]);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      className={classes.dialog}
      PaperProps={paperProps}
      onClose={onClose}
      onExited={reset}
    >
      <DialogContent className={classes.content}>
        <Grid container justify="space-between">
          <Grid item>
            <IconButton
              name="close"
              color="primary"
              size="small"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Fab
              name="saveProfile"
              variant="extended"
              size="small"
              color="primary"
            >
              <Typography className={classes.save} onClick={handleSave}>Save</Typography>
            </Fab>
          </Grid>
        </Grid>
        <div>
          <Grid container justify="center" alignItems="center" className={classes.backgroundBanner}>
            <input
              accept="image/*"
              className={classes.hidden}
              id="banner-edit-button"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="banner-edit-button">
              <IconButton name="editBannerImage" component="span" size="small">
                <CameraIcon />
              </IconButton>
            </label>
          </Grid>
          <div style={{ padding: 16 }}>
            <Grid container spacing={2}>
              <Grid item>
                <Grid container justify="center" alignItems="center" className={classes.profImg}>
                  <input
                    accept="image/*"
                    className={classes.hidden}
                    id="profile-image-edit-button"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="profile-image-edit-button">
                    <IconButton name="editProfileImage" component="span" size="small">
                      <CameraIcon />
                    </IconButton>
                  </label>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextInput label="Name" value={nextName} max={50} onChange={setNextName} />
          </Grid>
          <Grid item>
            <TextInput label="Handle" value={nextHandle} max={160} onChange={setNextHandle} />
          </Grid>
          <Grid item>
            <TextInput label="Location" value={nextLocation} max={30} onChange={setNextLocation} />
          </Grid>
          <Grid item>
            <TextInput label="Website" value={nextWebsite} max={128} onChange={setNextWebsite} />
          </Grid>
        </Grid>
      </DialogContent>

      {loading && (
        <div className={classes.loadingRoot}>
          <ThemedLinearProgress />
        </div>
      )}
    </Dialog>
  );
}

EditProfile.defaultProps = {
  open: false,
  onClose: () => {},
};

EditProfile.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default EditProfile;
