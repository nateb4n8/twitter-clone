import { gql, useMutation } from '@apollo/client';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Formik } from 'formik';
import React, { ReactElement } from 'react';
import * as Yup from 'yup';
import { Login } from '../generated/graphql';
import { useSessionContext } from './session/Session';
import { AppTheme } from './Theme';

const useStyles = makeStyles({
  dialog: {
    borderRadius: '50%',
  },
  form: {
    padding: 30,
  },
  bold: {
    fontWeight: 800,
  },
  content: {
    padding: 12,
  },
  paper: {
    borderRadius: 12,
  },
  next: {
    textTransform: 'none',
    padding: '0px 8px',
  },
});

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

type NewAccount = {
  name: String;
  email: String;
  password: String;
  confirmPassword: String;
};

const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      accessToken
      user {
        id
        username
        location
        createdAt
      }
    }
  }
`;

export function CreateAccount(): ReactElement {
  const classes = useStyles();
  const [createUser, { error }] = useMutation<Login>(CREATE_USER);
  const { setLogin } = useSessionContext();

  const theme = useTheme<AppTheme>();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const paperProps = fullScreen ? {} : { className: classes.paper };

  const onSubmitHandler = async (values: NewAccount) => {
    const { email, password } = values;
    try {
      const { data, errors } = await createUser({
        variables: {
          createUserInput: {
            username: email,
            password,
          },
        },
      });
      if (errors !== undefined || data === undefined || data === null) {
        throw new Error('Failed to create new User');
      }

      setLogin(data);
    } catch (ee) {
      console.error(ee);
    }
  };

  const initialValues: NewAccount = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(1).max(30).required('REQUIRED'),
        email: Yup.string().email().required('REQUIRED'),
        password: Yup.string()
          .matches(/^[a-zA-Z0-9]{3,30}$/)
          .required('Required'),
        confirmPassword: Yup.string()
          .matches(/^[a-zA-Z0-9]{3,30}$/)
          .required('Required'),
      })}
    >
      {(props) => {
        const { values, errors, touched, isValid } = props;
        const { handleChange, handleBlur, handleSubmit, submitForm } = props;
        const { password, confirmPassword } = values;
        return (
          <form onSubmit={handleSubmit}>
            <Dialog
              open
              fullWidth
              maxWidth="sm"
              fullScreen={fullScreen}
              className={classes.dialog}
              PaperProps={paperProps}
            >
              <DialogContent className={classes.content}>
                <Grid
                  container
                  spacing={4}
                  direction="column"
                  alignItems="stretch"
                  className={classes.form}
                >
                  <Grid item>
                    <Typography className={classes.bold} variant="h6">
                      Create your account
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.bold} variant="h6">
                      {error}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextInput
                      type="text"
                      name="name"
                      label="Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.name && touched.name)}
                      helperText={errors.name || ''}
                    />
                  </Grid>
                  <Grid item>
                    <TextInput
                      type="email"
                      name="email"
                      label="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.email && touched.email)}
                      helperText={errors.email || ''}
                    />
                  </Grid>
                  <Grid item>
                    <TextInput
                      type="password"
                      name="password"
                      label="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.password && touched.password)}
                      helperText={errors.password || ''}
                    />
                  </Grid>
                  <Grid item>
                    <TextInput
                      type="password"
                      name="confirmPassword"
                      label="Confirm Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched.confirmPassword &&
                          (password !== confirmPassword || errors.confirmPassword),
                      )}
                      helperText={errors.confirmPassword || ''}
                    />
                  </Grid>
                </Grid>
                <Grid container justify="center">
                  <Grid item>
                    <Fab
                      name="submit"
                      variant="extended"
                      size="small"
                      color="primary"
                      type="button"
                      onClick={submitForm}
                      disabled={!isValid || password !== confirmPassword}
                    >
                      <Typography className={classes.next}>Submit</Typography>
                    </Fab>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
}
