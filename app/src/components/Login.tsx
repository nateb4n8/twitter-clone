import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { ChangeEvent, ReactElement } from 'react';
import { fetchLogin } from '../utils/api';
import { authContext } from './AuthContext';

const useStyles = makeStyles(() => ({
  button: {
    width: '100%',
    textTransform: 'none',
  },
}));

function TextInput(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      variant="filled"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

export function Login(): ReactElement {
  const { setProfile } = React.useContext(authContext);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const classes = useStyles();

  const handleSubmit = async (event: ChangeEvent<unknown>) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    const res = await fetchLogin({ email, password }).catch((e) => setError(e.message));

    setLoading(false);

    if (res) {
      setProfile(res);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container alignItems="stretch" direction="column" spacing={3}>
        <Grid item>
          <Typography align="center" variant="h5">
            Log in to Twitter
          </Typography>
        </Grid>

        {loading && (
          <Grid item>
            <Typography>Logging in</Typography>
          </Grid>
        )}

        <Grid item>
          <TextInput
            type="email"
            name="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextInput
            type="password"
            name="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Fab
            variant="extended"
            color="primary"
            className={classes.button}
            href="/login"
            onClick={handleSubmit}
          >
            Log in
          </Fab>
        </Grid>

        {error && (
          <Grid item>
            <Typography>{error}</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
