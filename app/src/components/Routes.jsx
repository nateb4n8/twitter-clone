import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Profile from './Profile';
import Join from './Join';
import CreateAccount from './CreateAccount';
import Login from './Login';
import { authContext } from './AuthContext';
import ProfileProvider from './ProfileContext';
import AuthRoute from './AuthRoute';
import PublicRoute from './PublicRoute';
import Loading from './Loading';
import Main from './Main';

function Routes() {
  const { isAuthenticated, authenticating } = React.useContext(authContext);

  if (authenticating) return <Loading />;

  if (isAuthenticated) {
    return (
      <ProfileProvider>
        <Router>
          <Switch>
            <Route path="/login" render={() => <Redirect to="/home" />} />
            <AuthRoute path="/home" component={Main} />
            <AuthRoute path="/:handle" component={Profile} />
            <Route path="/" render={() => <Redirect to="/home" />} />
          </Switch>
        </Router>
      </ProfileProvider>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Join} />
        <PublicRoute path="/signup" component={CreateAccount} />
        <PublicRoute path="/login" component={Login} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

export default Routes;
