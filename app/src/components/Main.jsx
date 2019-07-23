import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  Fab, Button, Box, TextField, CardHeader, Card, IconButton, CardContent, ListItem, List, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction,
} from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import Messages from '@material-ui/icons/Email';
import Bookmark from '@material-ui/icons/Bookmark';
import ListIcon from '@material-ui/icons/List';
import Face from '@material-ui/icons/Face';
import Explore from '@material-ui/icons/Explore';


import Navigation from './Navigation';

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: '#444',
    width: '100%',
    padding: 8,
  },
  home: {
    width: '100%',
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
    <Container>
      <Grid container justify="center">
        <Grid item xs={1} lg={3}>
          <Paper className={classes.paper}>
            <Navigation items={menuItems} />
          </Paper>
        </Grid>
        <Grid item xs={6} lg={5}>
          <Paper className={classes.paper}>
            <Grid container direction="column">
              <Grid item xs={12} container>
                <Box flexGrow={1}>
                  <Button variant="outlined" className={classes.home}>Home</Button>
                </Box>
                <Grid item>
                  <Fab size="small">$</Fab>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={5} lg={4}>
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default Main;
