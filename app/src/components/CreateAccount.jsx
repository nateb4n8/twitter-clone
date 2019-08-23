import React from 'react';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { fetchJoin } from '../utils/api';

const useStyles = makeStyles({
  dialog: {
    // padding: 5,
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

function TextInput(props) {
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

function SimpleSelect({ name, label, ...rest }) {
  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel htmlFor={name} shrink>{label}</InputLabel>
      <Select
        native
        input={<FilledInput name={name} id={name} />}
        {...rest}
      />
    </FormControl>
  );
}

function CreateAccount() {
  const [submitting, setSubmitting] = React.useState(false);

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const paperProps = fullScreen ? {} : { className: classes.paper };

  const handleSubmit = async ({ name, email, password }) => {
    setSubmitting(true);
    const res = await fetchJoin({ name, email, password })
      .catch((err) => {
        console.error(err);
        return null;
      });
    console.log(res);

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(1).max(30).required('REQUIRED'),
        email: Yup.string().email().required('REQUIRED'),
        password: Yup.string().matches(/^[a-zA-Z0-9]{3,30}$/).required('Required'),
        confirmPassword: Yup.string().matches(/^[a-zA-Z0-9]{3,30}$/).required('Required'),
      })}
    >
      {(props) => {
        const { values, errors, touched, isValid } = props;
        const { handleChange, handleBlur, handleSubmit } = props;
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
                <Grid container spacing={4} direction="column" alignItems="stretch" className={classes.form}>
                  {submitting && <h1>SUBMITTING</h1>}
                  <Grid item>
                    <Typography className={classes.bold} variant="h6">Create your account</Typography>
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
                        touched.confirmPassword
                        && (password !== confirmPassword || errors.confirmPassword),
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

export default CreateAccount;
