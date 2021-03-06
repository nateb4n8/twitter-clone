import { gql, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { ChangeEvent, ReactElement } from 'react';
import { useSessionContext } from './session/Session';

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

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export function LoginForm(): ReactElement {
  const classes = useStyles();
  const { setAccessToken } = useSessionContext();
  const [login, { loading }] = useMutation<string>(LOGIN);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (event: ChangeEvent<unknown>) => {
    event.preventDefault();

    const { data, errors } = await login({
      variables: {
        username,
        password,
      },
    });

    if (errors || data === null || data === undefined) {
      console.error('Login failed');
      return;
    }
    setAccessToken(data);
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
            type="username"
            name="username"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
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
        {/* 
        {error && (
          <Grid item>
            <Typography>{error}</Typography>
          </Grid>
        )} */}
      </Grid>
    </Container>
  );
}
