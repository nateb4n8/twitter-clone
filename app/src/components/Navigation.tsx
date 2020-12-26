import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { MenuButton } from './MenuButton';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
    },
  },
}));

export type NavigationItem = {
  label: string;
  link: string;
  icon: ReactElement;
};

type NavigationProps = { items?: NavigationItem[] };

export function Navigation(props: NavigationProps): ReactElement {
  const { items = [] } = props;
  const classes = useStyles();

  if (items.length === 0) return <></>;

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
