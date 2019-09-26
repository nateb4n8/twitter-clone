import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authContext } from './AuthContext';


export default function AuthRoute(props) {
  const {
    component: Component,
    redirectTo = '/login',
    noRedirect,
    ...rest
  } = props;

  const { isAuthenticated, authenticating } = React.useContext(authContext);

  return (
    <Route
      {...rest}
      render={(renderProps) => {
        if (isAuthenticated) {
          return <Component {...renderProps} />;
        }

        if (authenticating) {
          return null;
        }

        if (!noRedirect) {
          return (
            <Redirect to={{
              pathname: redirectTo,
              state: { from: renderProps.location },
            }}
            />
          );
        }
      }}
    />
  );
}
