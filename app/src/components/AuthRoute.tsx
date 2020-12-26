import React, { ReactElement } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { authContext } from './AuthContext';

type AuthRouteProps = {
  component: React.ComponentType<RouteComponentProps>;
  redirectTo?: string;
  noRedirect?: boolean;
  [key: string]: unknown;
};

export function AuthRoute(props: AuthRouteProps): ReactElement {
  const { component: Component, redirectTo = '/login', noRedirect, ...rest } = props;

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
            <Redirect
              to={{
                pathname: redirectTo,
                state: { from: renderProps.location },
              }}
            />
          );
        }
        return null;
      }}
    />
  );
}
