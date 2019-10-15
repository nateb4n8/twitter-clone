import React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Hidden,
  Grid,
  Paper,
  TextField,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Fab,
} from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import Messages from '@material-ui/icons/Email';
import Bookmark from '@material-ui/icons/Bookmark';
import ListIcon from '@material-ui/icons/List';
import Face from '@material-ui/icons/Face';
import Explore from '@material-ui/icons/Explore';
import ProfileData from './ProfileData';

import Navigation from './Navigation';
import TweetButton from './TweetButton';

const useStyles = makeStyles(theme => ({
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


const menuItems = [
  { label: 'Home', link: '#Home', icon: <Home /> },
  { label: 'Explore', link: '#Explore', icon: <Explore /> },
  { label: 'Notifications', link: '#Notifications', icon: <Notifications /> },
  { label: 'Messages', link: '#Messages', icon: <Messages /> },
  { label: 'Bookmarks', link: '#Bookmarks', icon: <Bookmark /> },
  { label: 'Lists', link: '#Lists', icon: <ListIcon /> },
  { label: 'Profile', link: '#Profile', icon: <Face /> },
];

function Main() {
  const classes = useStyles();

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
        {/* <div className="right">
          <Paper className={classes.paper}>
            <Grid container direction="column">
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Search Twitter"
                />
              </Grid>
              <Grid item>
                <Card>
                  <CardHeader
                    title="Trends for you"
                    action={<IconButton>@</IconButton>}
                  />
                  <CardContent>
                    <List>
                      <ListItem button>Lorem, ipsum dolor sit amet consectetur</ListItem>
                      <ListItem button>Lorem, ipsum dolor sit amet consectetur</ListItem>
                      <ListItem button>Lorem, ipsum dolor sit amet consectetur</ListItem>
                      <ListItem button>Lorem, ipsum dolor sit amet consectetur</ListItem>
                      <ListItem button>Lorem, ipsum dolor sit amet consectetur</ListItem>

                      <ListItem button>Show more</ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item>
                <Card>
                  <CardHeader
                    title="Who to follow"
                  />
                  <CardContent>
                    <List>
                      <ListItem button>
                        <ListItemAvatar><Avatar>G</Avatar></ListItemAvatar>
                        <ListItemText
                          primary="Breathtaking"
                          secondary="@keanureeves"
                        />
                        <ListItemSecondaryAction>
                          <Fab variant="extended" size="small">Follow</Fab>
                        </ListItemSecondaryAction>
                      </ListItem>

                      <ListItem button>Show more</ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </Paper>
        </div> */}

      </div>
    </>
  );
}

export default Main;
