import React from 'react';
import {
  Fab, TextField, Select, Grid, Typography, Dialog, useMediaQuery, DialogContent, FormControl, InputLabel, FilledInput,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const years = [];
for (let i = 0; i < 120; i += 1) {
  years.push(2019 - i);
}
const days = [];
for (let i = 1; i < 32; i += 1) {
  days.push(i);
}


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
  const { label, onChange } = props;
  return (
    <TextField
      variant="filled"
      name={label.toLowerCase()}
      fullWidth
      label={label}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}

function SimpleSelect(props) {
  const { children, name, label } = props;
  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel htmlFor={name} shrink>{label}</InputLabel>
      <Select
        // name={name}
        native
        value=""
        input={<FilledInput name={name} id={name} />}
      >
        {children}
      </Select>
    </FormControl>
  );
}

function CreateAccount() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const paperProps = fullScreen ? {} : { className: classes.paper };
  return (
    <Dialog
      open
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      className={classes.dialog}
      PaperProps={paperProps}
    >
      <DialogContent className={classes.content}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography className={classes.bold}>Step 1 of 5</Typography>
          </Grid>
          <Grid item>
            <Fab
              name="next"
              variant="extended"
              size="small"
              color="primary"
            >
              <Typography className={classes.next}>
                Next
              </Typography>
            </Fab>
          </Grid>
        </Grid>
        <Grid container spacing={4} direction="column" alignItems="stretch" className={classes.form}>
          <Grid item>
            <Typography className={classes.bold} variant="h6">Create your account</Typography>
          </Grid>
          <Grid item>
            <TextInput label="Name" />
          </Grid>
          <Grid item>
            <TextInput label="Phone" />
          </Grid>
          <Grid item>
            <TextInput label="Email" />
          </Grid>
          <Grid item>
            Date of birth
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <SimpleSelect name="birth-month" label="Month">
                  <option value="" />
                  { months.map((month, index) => <option value={`${index}`} key={month}>{month}</option>)}
                </SimpleSelect>
              </Grid>
              <Grid item xs={3}>
                <SimpleSelect name="birth-day" label="Day">
                  <option value="" />
                  { days.map(day => <option value={`${day}`} key={day}>{day}</option>)}
                </SimpleSelect>
              </Grid>
              <Grid item xs={4}>
                <SimpleSelect name="birth-year" label="Year">
                  <option value="" />
                  { years.map(year => <option value={`${year}`} key={year}>{year}</option>)}
                </SimpleSelect>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAccount;
