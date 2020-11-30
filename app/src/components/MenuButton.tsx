import { Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme) => ({
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

type MenuButtonProps = {
  label: string;
  href: string;
  icon: ReactElement;
};

export function MenuButton(props: MenuButtonProps): ReactElement {
  const { href, label, icon } = props;
  const classes = useStyles();

  return (
    <div>
      <Fab variant="extended" href={href} className={classes.extended}>
        {icon}
        <Typography className={classes.label}>{label}</Typography>
      </Fab>
      <Fab size="small" href={href} className={classes.round}>
        {icon}
      </Fab>
    </div>
  );
}
