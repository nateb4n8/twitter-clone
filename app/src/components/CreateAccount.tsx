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
import { FixMeLater } from '..';
import { fetchJoin } from '../utils/api';
import { authContext } from './AuthContext';
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

export function CreateAccount(): ReactElement {
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);

  const { setProfile } = React.useContext(authContext);

  const classes = useStyles();
  const theme = useTheme<AppTheme>();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const paperProps = fullScreen ? {} : { className: classes.paper };

  const handleSubmit = async ({ name, email, password }: FixMeLater) => {
    setSubmitting(true);
    setSubmitError(null);

    const profile = await fetchJoin({ name, email, password }).catch((err) =>
      setSubmitError(err.message),
    );

    setSubmitting(false);

    if (!submitError) {
      setProfile(profile);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      onSubmit={handleSubmit}
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
        const { values, errors, touched, isValid } = props as FixMeLater;
        const { handleChange, handleBlur, handleSubmit } = props as FixMeLater;
        const { password, confirmPassword } = values;

        return (
          <form>
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
                  {submitting && <h1>SUBMITTING</h1>}
                  <Grid item>
                    <Typography className={classes.bold} variant="h6">
                      Create your account
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.bold} variant="h6">
                      {submitError}
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
                          (password !== confirmPassword ||
                            errors.confirmPassword),
                      )}
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
                      onClick={handleSubmit}
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
