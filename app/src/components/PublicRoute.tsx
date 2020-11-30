import React, { ComponentType, ReactElement } from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { authContext } from './AuthContext';

type PublicRouteProps = RouteProps & {
  component: ComponentType<RouteComponentProps>;
  redirectTo: string;
};

export function PublicRoute(props: PublicRouteProps): ReactElement {
  const { component: Component, redirectTo = '/profile', ...rest } = props;
  const { isAuthenticated } = React.useContext(authContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
