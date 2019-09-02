import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { blue, orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});

function Login({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

Login.defaultProps = {
  children: null,
};

Login.propTypes = {
  children: PropTypes.node,
};

export default Login;
