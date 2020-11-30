import React, { ReactElement } from 'react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { blue, orange } from '@material-ui/core/colors';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const palette: PaletteOptions = {
  primary: blue,
  secondary: orange,
};

const theme = createMuiTheme({ palette });

export type AppTheme = typeof theme;

type ThemeProps = { children: React.ReactNode };

export function Theme(props: ThemeProps): ReactElement {
  const { children } = props;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
