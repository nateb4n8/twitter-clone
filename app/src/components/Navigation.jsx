import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MenuButton from './MenuButton';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
  },
}));


function Navigation({ items }) {
  const classes = useStyles();
  return (
    <Grid container direction="column" spacing={1} className={classes.root}>
      {items.map(({ label, link, icon }) => (
        <Grid item key={label}>
          <MenuButton label={label} href={link} icon={icon} />
        </Grid>
      ))}
    </Grid>
  );
}

Navigation.defaultProps = {
  items: [],
};

Navigation.propTypes = {
  items: PropTypes.array,
};

export default Navigation;
