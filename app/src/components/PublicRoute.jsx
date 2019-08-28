import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authContext } from './AuthContext';


export default function PublicRoute({ component: Component, redirectTo = '/profile', ...rest }) {
  const { isAuthenticated } = React.useContext(authContext);

  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated === false
          ? <Component {...props} />
          : (
            <Redirect to={{
              pathname: redirectTo,
              state: { from: props.location },
            }}
            />
          )
      )}
    />
  );
}
