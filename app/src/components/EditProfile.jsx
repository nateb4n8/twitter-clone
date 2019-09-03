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
import DefaultProfileImage from '../images/default-profile.svg';
import { profileContext } from './ProfileContext';
import { fetchUpdateProfile } from '../utils/api';

const ThemedLinearProgress = withStyles(theme => ({
  colorPrimary: {
    backgroundColor: theme.palette.secondary.main,
  },
  barColorPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
}))(LinearProgress);

const useStyles = makeStyles(theme => ({
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
}));


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
  const { profile, setProfile } = React.useContext(profileContext);


  const [profileImageSrc, setProfileImageSrc] = React.useState(DefaultProfileImage);
  const [profileImageFile, setProfileImageFile] = React.useState(null);
  const [nextName, setNextName] = React.useState('');
  const [nextHandle, setNextHandle] = React.useState('');
  const [nextLocation, setNextLocation] = React.useState('');
  const [nextWebsite, setNextWebsite] = React.useState('');

  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const theme = useTheme();
  const classes = useStyles({ src: profileImageSrc });
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const paperProps = fullScreen ? {} : { className: classes.paper };

  React.useEffect(() => {
    setNextName(profile.name);
    setNextHandle(profile.handle);
    setNextLocation(profile.location);
    setNextWebsite(profile.website);
    setProfileImageSrc(profile.profileImageSrc);
  }, [profile]);

  const handleSave = async () => {
    const nextProfile = {};
    if (nextName !== profile.name) nextProfile.name = nextName;
    if (nextHandle !== profile.handle) nextProfile.handle = nextHandle;
    if (nextLocation !== profile.location) nextProfile.location = nextLocation;
    if (nextWebsite !== profile.website) nextProfile.website = nextWebsite;
    if (profileImageSrc !== profile.profileImageSrc) nextProfile.profileImage = profileImageFile;

    if (Object.keys(nextProfile).length > 0) {
      setLoading(true);

      nextProfile.name = nextName;
      nextProfile.handle = nextHandle;

      const res = await fetchUpdateProfile(nextProfile).catch(setError);
      if (error) return console.error(error);

      setLoading(false);
      setProfile({ ...profile, ...res });
    }

    onClose();
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImageSrc(event.target.result);
        setProfileImageFile(files[0]);
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
        <div className={classes.header}>
          <Grid container justify="center" alignItems="center" className={classes.profileImage}>
            <input
              accept="image/*"
              className={classes.hidden}
              id="icon-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton name="editProfileImage" component="span" size="small">
                <CameraIcon />
              </IconButton>
            </label>
          </Grid>
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
