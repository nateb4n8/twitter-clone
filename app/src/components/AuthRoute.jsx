import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authContext } from './AuthContext';


export default function AuthRoute({ component: Component, redirectTo = '/login', ...rest }) {
  const { isAuthenticated } = React.useContext(authContext);

  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated === true
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
