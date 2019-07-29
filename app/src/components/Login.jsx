import React from 'react';
import {
  Fab, Grid, makeStyles, List, ListItem, ListItemIcon, ListItemText, Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import GroupIcon from '@material-ui/icons/GroupOutlined';
import MessageIcon from '@material-ui/icons/MessageOutlined';

const useStyles = makeStyles(theme => ({
  pane: {
    [theme.breakpoints.up('sm')]: {
      height: '100vh',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      height: 'auto',
    },
  },
  leftPanel: {
    backgroundColor: theme.palette.primary.main,
  },
  fullHeight: {
    [theme.breakpoints.up('md')]: {
      height: '100vh',
    },
    padding: 16,
  },
  list: {
    color: '#fff',
    '& svg': {
      color: '#fff',
    },
  },
  content: {
    maxWidth: 350,
  },
  button: {
    width: '100%',
    height: 36,
    boxShadow: 'none',
    textTransform: 'none',
  },
  outlineButton: {
    width: '100%',
    height: 36,
    boxShadow: 'none',
    textTransform: 'none',
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#cfe8fc',
    },
  },
}));

function Login() {
  const classes = useStyles();

  return (
    <Grid container className={classes.pane} alignItems="stretch">
      <Grid item md={6} className={classes.leftPanel}>
        <Grid container justify="center" alignItems="center" className={classes.fullHeight}>
          <List className={classes.list}>
            <ListItem>
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary="Follow your interests." />
            </ListItem>
            <ListItem>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Hear what people are talking about." />
            </ListItem>
            <ListItem>
              <ListItemIcon><MessageIcon /></ListItemIcon>
              <ListItemText primary="Join the conversation." />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid item md={6}>
        <Grid container justify="center" alignItems="center" className={classes.fullHeight}>
          <Grid container direction="column" alignItems="stretch" spacing={2} className={classes.content}>
            <Grid item>
              <Typography variant="h5">See what's happening in the world right now</Typography>
            </Grid>
            <Grid item>
              Join Twitter today.
            </Grid>
            <Grid item>
              <Fab href="/signup" variant="extended" className={classes.button} color="primary">Sign Up</Fab>
            </Grid>
            <Grid item>
              <Fab href="/login" variant="extended" className={classes.outlineButton} color="primary">Log In</Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
