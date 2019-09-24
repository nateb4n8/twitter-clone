import React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Create from '@material-ui/icons/Create';
import ComposeTweet from './ComposeTweet';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      right: 0,
      bottom: 0,
      margin: theme.spacing(2),
    },
  },
  extended: {
    width: '100%',
    textTransform: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  round: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));


function TweetButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className={classes.root}>
        <Fab
          variant="extended"
          href="#compose-tweet"
          color="primary"
          onClick={() => setOpen(true)}
          className={classes.extended}
        >
          Tweet
        </Fab>
        <Fab
          href="#compose-tweet"
          color="primary"
          onClick={() => setOpen(true)}
          className={classes.round}
        >
          <Create />
        </Fab>
      </div>
      <ComposeTweet open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default TweetButton;
