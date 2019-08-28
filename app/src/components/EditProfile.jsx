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
import { makeStyles, useTheme } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import CameraIcon from '@material-ui/icons/CameraAltOutlined';
import DefaultProfileImage from '../images/default-profile.svg';
import { profileContext } from './ProfileContext';
import { fetchUpdateProfile } from '../utils/api';


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
  const profile = React.useContext(profileContext);

  const theme = useTheme();
  const classes = useStyles({ src: profile.profileImageSrc || DefaultProfileImage });
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const paperProps = fullScreen ? {} : { className: classes.paper };

  const [nextName, setNextName] = React.useState('');
  const [nextHandle, setNextHandle] = React.useState('');
  const [nextLocation, setNextLocation] = React.useState('');
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setNextName(profile.name);
    setNextHandle(profile.handle);
    setNextLocation(profile.location);
  }, [profile]);

  const handleSave = () => {
    fetchUpdateProfile({
      name: nextName,
      handle: nextHandle,
      email: profile.email,
      location: nextLocation,
    })
      .then(onClose)
      .catch(setError);
  };

  const bio = '';
  const website = '';

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
            <IconButton name="editProfileImage" size="small">
              <CameraIcon />
            </IconButton>
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
            <TextInput label="Website" value={website} max={100} onChange={() => null} />
          </Grid>
        </Grid>
      </DialogContent>
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
