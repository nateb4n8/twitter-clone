import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authContext } from './AuthContext';


export default function AuthRoute({ component: Component, redirectTo = '/login', ...rest }) {
  const { isAuthenticated, authenticating } = React.useContext(authContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        }

        if (authenticating) {
          return null;
        }

        return (
          <Redirect to={{
            pathname: redirectTo,
            state: { from: props.location },
          }}
          />
        );
      }}
    />
  );
}
