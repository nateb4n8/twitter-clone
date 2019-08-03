import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    textTransform: 'none',
  },
}));

function TextInput(props) {
  const {
    label, type, autoFocus,
  } = props;
  return (
    <TextField
      variant="filled"
      name={label.toLowerCase()}
      fullWidth
      label={label}
      type={type}
      autoFocus={autoFocus}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

function Join() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Grid container alignItems="stretch" direction="column" spacing={3}>
        <Grid item>
          <Typography align="center" variant="h5">Log in to Twitter</Typography>
        </Grid>
        <Grid item>
          <TextInput label="Email" type="email" autoFocus />
        </Grid>
        <Grid item>
          <TextInput label="Password" type="password" />
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            className={classes.button}
            href="/login"
          >
            Log in
          </Fab>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Join;
