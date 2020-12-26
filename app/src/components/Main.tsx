import { Grid, Hidden, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Bookmark from '@material-ui/icons/Bookmark';
import Messages from '@material-ui/icons/Email';
import Explore from '@material-ui/icons/Explore';
import Face from '@material-ui/icons/Face';
import Home from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import Notifications from '@material-ui/icons/Notifications';
import React, { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import { Navigation, NavigationItem } from './Navigation';
import ProfileData from './ProfileData';
import { TweetButton } from './TweetButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  home: {
    width: '100%',
  },
  container: {
    height: '100vh',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  navigation: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
  tweetButton: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },

  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    // height: '100vh',
    alignItems: 'stretch',

    '& .left': {
      position: 'fixed',
      height: '100vh',
      [theme.breakpoints.only('xs')]: {
        width: 0,
        overflow: 'hidden',
      },
      [theme.breakpoints.only('sm')]: {
        width: 75,
        left: 0,
      },
      [theme.breakpoints.only('md')]: {
        width: 75,
        right: 'calc(50% + 250px)',
      },
      [theme.breakpoints.up('lg')]: {
        left: 'calc(50% - 300px - 300px)',
        width: 300,
      },
    },

    '& .center': {
      minHeight: '100vh',
      width: 600,
      [theme.breakpoints.only('xs')]: {
        width: '100%',
      },
      [theme.breakpoints.only('sm')]: {
        width: 'calc(100% - 75px)',
        marginLeft: 75,
      },
      [theme.breakpoints.only('md')]: {
        width: 500,
      },
    },

    '& .right': {
      position: 'fixed',
      left: 'calc(50% + 300px)',

      backgroundColor: 'grey',
      height: '100vh',
      width: 300,
      [theme.breakpoints.down('sm')]: {
        width: 0,
        overflow: 'hidden',
      },
      [theme.breakpoints.only('md')]: {
        left: 'calc(50% + 150px)',
      },
    },
  },
}));

export function Main(): ReactElement {
  const classes = useStyles();
  const menuItems: NavigationItem[] = [
    { label: 'Home', link: '#Home', icon: <Home /> },
    { label: 'Explore', link: '#Explore', icon: <Explore /> },
    { label: 'Notifications', link: '#Notifications', icon: <Notifications /> },
    { label: 'Messages', link: '#Messages', icon: <Messages /> },
    { label: 'Bookmarks', link: '#Bookmarks', icon: <Bookmark /> },
    { label: 'Lists', link: '#Lists', icon: <ListIcon /> },
    { label: 'Profile', link: '#Profile', icon: <Face /> },
  ];

  return (
    <>
      <div className={classes.root}>
        <div className="left">
          <div className={classes.navigation}>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Hidden only="xs">
                  <Navigation items={menuItems} />
                </Hidden>
              </Grid>
              <Grid item>
                <div className={classes.tweetButton}>
                  <TweetButton />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="center">
          <Paper className={classes.paper} elevation={3} square>
            <Route path="/:handle" component={ProfileData} />
          </Paper>
        </div>
      </div>
    </>
  );
}
