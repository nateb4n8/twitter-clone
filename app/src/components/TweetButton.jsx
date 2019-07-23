import React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Create from '@material-ui/icons/Create';

const useStyles = makeStyles(theme => ({
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

  return (
    <div>
      <Fab variant="extended" href="#compose-tweet" className={classes.extended}>Tweet</Fab>
      <Fab href="#compose-tweet" className={classes.round}><Create /></Fab>
    </div>
  );
}

export default TweetButton;
