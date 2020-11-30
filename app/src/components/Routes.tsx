import React, { ReactElement, useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { authContext } from './AuthContext';
import { AuthRoute } from './AuthRoute';
import { CreateAccount } from './CreateAccount';
import Join from './Join';
import Loading from './Loading';
import { Login } from './Login';
import { Main } from './Main';

export function Routes(): ReactElement {
  const { isAuthenticated, authenticating, profile } = useContext(authContext);

  if (authenticating) return <Loading />;

  return (
    <Router>
      <Switch>
        <Route
          path="/signup"
          render={() => {
            if (isAuthenticated && profile) {
              return <Redirect to={`/${profile.handle}`} />;
            }
            return <CreateAccount />;
          }}
        />
        <Route
          path="/login"
          render={() =>
            isAuthenticated === true ? <Redirect to="/home" /> : <Login />
          }
        />
        <AuthRoute path="/home" component={Main} />
        <AuthRoute path="/:handle" component={Main} />
        <Route
          exact
          path="/"
          render={() =>
            isAuthenticated === true ? <Redirect to="/home" /> : <Join />
          }
        />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}
