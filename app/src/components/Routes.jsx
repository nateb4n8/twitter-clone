import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import ProfileData from './ProfileData';
import Join from './Join';
import CreateAccount from './CreateAccount';
import Login from './Login';
import { authContext } from './AuthContext';
import AuthRoute from './AuthRoute';
import Loading from './Loading';
import Main from './Main';

function Routes() {
  const { isAuthenticated, authenticating, profile } = React.useContext(authContext);

  if (authenticating) return <Loading />;

  return (
    <Router>
      <Switch>
        <Route
          path="/signup"
          render={() => (
            isAuthenticated === true
              ? <Redirect to={`/${profile.handle}`} />
              : <CreateAccount />
          )}
        />

        <Route
          path="/login"
          render={() => (
            isAuthenticated === true
              ? <Redirect to="/home" />
              : <Login />
          )}
        />

        <AuthRoute path="/home" component={Main} />
        <AuthRoute path="/:handle" component={ProfileData} />

        <Route
          exact
          path="/"
          render={() => (
            isAuthenticated === true
              ? <Redirect to="/home" />
              : <Join />
          )}
        />

        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

export default Routes;
