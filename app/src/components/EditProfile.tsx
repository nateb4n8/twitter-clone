import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CameraIcon from '@material-ui/icons/CameraAltOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme, withStyles } from '@material-ui/styles';
import _ from 'lodash';
import React, { ChangeEvent, ReactElement, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchUpdateProfile } from '../utils/api';
import { bannerImagePath, profileImagePath } from '../utils/config';
import { authContext } from './AuthContext';
import { ProfileSchema } from './Profile';
import { AppTheme } from './Theme';

const ThemedLinearProgress = withStyles((theme: AppTheme) => ({
  colorPrimary: {
    backgroundColor: theme.palette.secondary.main,
  },
  barColorPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
}))(LinearProgress);

type StyleProps = {
  src: string;
  bannerImg: string;
};

const useStyles = makeStyles((theme: AppTheme) => {
  const imgHeight = 120;
  const borderWidth = 0;

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
    profileImage: ({ src }: StyleProps) => ({
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
    backgroundBanner: {
      width: '100%',
      height: 160,
      background: ({ bannerImg }: StyleProps) => `center / cover no-repeat url(${bannerImg})`,
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
      background: ({ src }: StyleProps) => `center grey / cover no-repeat url(${src})`,
      '& button': {
        color: '#fff',
      },
    },
  };
});

type TextInputProps = {
  label: string;
  onChange: (value: string) => void;
  value: string;
  max: number;
};

function TextInput(props: TextInputProps) {
  const { label, onChange, value = '', max = 10 } = props;
  return (
    <Grid container justify="flex-end">
      <TextField
        variant="filled"
        name={label.toLowerCase()}
        fullWidth
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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

type EditProfileProps = {
  open: boolean;
  onClose: () => void;
};

export function EditProfile(props: EditProfileProps): ReactElement {
  const { profile, setProfile } = useContext(authContext);
  if (profile === undefined) return <Redirect to={{ pathname: '/login' }} />;

  const { open = false, onClose = () => undefined } = props;

  const [profileImageSrc, setProfileImageSrc] = useState(`${profileImagePath}${profile.handle}`);
  const [profileImageFile, setProfileImageFile] = useState<File>();

  const [bannerImageSrc, setBannerImageSrc] = useState(`${bannerImagePath}${profile.handle}`);
  const [bannerImageFile, setBannerImageFile] = useState<File>();

  const [nextName, setNextName] = useState(profile.name);
  const [nextHandle, setNextHandle] = useState(profile.handle);
  const [nextLocation, setNextLocation] = useState(profile.location);
  const [nextWebsite, setNextWebsite] = useState(profile.website);

  const [loading, setLoading] = useState(false);

  const theme = useTheme<AppTheme>();
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

    if (!_.isEqual(profile, nextProfile)) {
      setLoading(true);
      const filters = ['name', 'handle', 'location', 'website', 'profileImage', 'bannerImage'];
      const payload = _.omitBy(
        _.pick(
          {
            ...nextProfile,
            profileImage: profileImageFile,
            bannerImage: bannerImageFile,
          },
          filters,
        ),
        _.isNil,
      );

      try {
        const res = await fetchUpdateProfile(payload as ProfileSchema);
        let { profileImageId, bannerImageId } = profile;
        if (profileImageFile) {
          profileImageId = `${new Date().getTime()}`;
        }
        if (bannerImageFile) {
          bannerImageId = `${new Date().getTime()}`;
        }
        setProfile({
          ...profile,
          ...res,
          profileImageId,
          bannerImageId,
        });
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    onClose();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files, id } = e.target;
    if (!files || !files[0]) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = String(event.target?.result || '');
      if (id === 'profile-image-edit-button') {
        setProfileImageSrc(src);
        setProfileImageFile(file);
      } else if (id === 'banner-edit-button') {
        setBannerImageSrc(src);
        setBannerImageFile(file);
      }
    };
    reader.readAsDataURL(file);
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
            <IconButton name="close" color="primary" size="small" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Fab name="saveProfile" variant="extended" size="small" color="primary">
              <Typography className={classes.save} onClick={handleSave}>
                Save
              </Typography>
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
            <IconButton component="span" size="small">
              <CameraIcon />
            </IconButton>
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
                  <IconButton size="small" name="editProfileImage">
                    <CameraIcon />
                  </IconButton>
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
