import React, { ReactElement } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { useSessionContext } from './session/Session';

type AuthRouteProps = {
  component: React.ComponentType<RouteComponentProps>;
  redirectTo?: string;
  noRedirect?: boolean;
  [key: string]: unknown;
};

export function AuthRoute(props: AuthRouteProps): ReactElement {
  const { component: Component, redirectTo = '/login', noRedirect, ...rest } = props;

  const { accessToken } = useSessionContext();

  return (
    <Route
      {...rest}
      render={(renderProps) => {
        if (accessToken) {
          return <Component {...renderProps} />;
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
