import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Fab } from '@material-ui/core';

const Navigation = ({ items }) => (
  <Grid container direction="column" spacing={1}>
    {items.map(({ label, link }) => (
      <Grid item key={label}>
        <Fab variant="extended" href={link}>{label}</Fab>
      </Grid>
    ))}

    <Grid item>
      <Fab variant="extended" href="#compose-tweet">Tweet</Fab>
    </Grid>
  </Grid>
);

Navigation.defaultProps = {
  items: [],
};

Navigation.propTypes = {
  items: PropTypes.array,
};

export default Navigation;
