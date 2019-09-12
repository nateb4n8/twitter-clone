import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// import {} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size={70} thickness={5} />
    </div>
  );
}
