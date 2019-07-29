import React from 'react';
import {
  Grid, makeStyles, Card, CardContent, Container, TextField, Fab, Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    textTransform: 'none',
  },
}));

function TextInput(props) {
  const {
    label, onChange, type, autoFocus,
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
