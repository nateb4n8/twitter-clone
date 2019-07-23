import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  extended: {
    textTransform: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  round: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  label: {
    marginLeft: 12,
  },
}));


function MenuButton(props) {
  const { href, label, icon } = props;
  const classes = useStyles();

  return (
    <div>
      <Fab variant="extended" href={href} className={classes.extended}>
        {icon}
        <Typography className={classes.label}>{label}</Typography>
      </Fab>
      <Fab size="small" href={href} className={classes.round}>{icon}</Fab>
    </div>
  );
}

MenuButton.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default MenuButton;
