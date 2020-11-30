import { CircularProgress } from '@material-ui/core';
import { blue, orange, red } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Gif from '@material-ui/icons/Gif';
import InsertPhoto from '@material-ui/icons/InsertPhoto';
import Mood from '@material-ui/icons/Mood';
import Poll from '@material-ui/icons/Poll';
import { makeStyles, useTheme } from '@material-ui/styles';
import React, { ReactElement } from 'react';
import { fetchCreateTweet } from '../utils/api';
import { AppTheme } from './Theme';

type StyleProps = {
  textLevel: 0 | 1 | 2;
};

function getLevelColor(props: StyleProps): string {
  const { textLevel } = props;
  return [blue[500], orange[500], red[500]][textLevel];
}

const useStyles = makeStyles(() => ({
  dialog: {
    borderRadius: '50%',
  },
  content: {
    padding: 12,
  },
  paper: {
    borderRadius: 12,
  },
  next: {
    textTransform: 'none',
    padding: '0px 8px',
  },
  spacer: {
    flexGrow: 1,
  },
  circularProgress: {
    color: getLevelColor,
  },
}));

type ComposeTweetProps = {
  open: boolean;
  onClose: () => void;
};

export function ComposeTweet(props: ComposeTweetProps): ReactElement {
  const { open, onClose } = props;
  const [text, setText] = React.useState('');
  const textPercent = Math.round((text.length / 256) * 100);
  const styleProps: StyleProps = { textLevel: 0 };
  if (textPercent > 50) styleProps.textLevel = 1;
  if (textPercent > 75) styleProps.textLevel = 2;

  const classes = useStyles(styleProps);
  const theme = useTheme<AppTheme>();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const paperProps = fullScreen ? {} : { className: classes.paper };

  const handleSubmit = async () => {
    try {
      await fetchCreateTweet({ text });
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      className={classes.dialog}
      PaperProps={paperProps}
    >
      <DialogContent className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="space-between">
              <Grid item>
                <IconButton size="small" name="go-back" onClick={onClose}>
                  <ArrowBack />
                </IconButton>
              </Grid>
              <Grid item>
                <Fab
                  name="tweet-submit"
                  variant="extended"
                  size="small"
                  color="primary"
                  onClick={handleSubmit}
                >
                  <Typography className={classes.next}>Tweet</Typography>
                </Fab>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              name="tweet-content"
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              inputProps={{
                maxLength: 256,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item>
                <FormLabel htmlFor="add-image">
                  <IconButton size="small" component="span">
                    <InsertPhoto />
                  </IconButton>
                </FormLabel>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="add-image"
                  multiple
                  type="file"
                />
              </Grid>
              <Grid item>
                <IconButton size="small" name="add-gif">
                  <Gif />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton size="small" name="add-poll">
                  <Poll />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton size="small" name="add-emoji">
                  <Mood />
                </IconButton>
              </Grid>
              <Grid item className={classes.spacer} />
              <Grid item>
                <CircularProgress
                  variant="static"
                  value={textPercent}
                  className={classes.circularProgress}
                  size={25}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
