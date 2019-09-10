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

function Routes() {
  const { isAuthenticated } = React.useContext(authContext);

  if (isAuthenticated) {
    return (
      <ProfileProvider>
        <Router>
          <Switch>
            {/* <Route path="/" exact component={() => <h1>HOME</h1>} /> */}
            {/* <AuthRoute path="/home" component={Profile} /> */}
            {/* <AuthRoute path="/profile" component={Profile} /> */}
            <AuthRoute path="/:handle" component={Profile} />
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
        {/* <Route render={() => <Redirect to="/" />} /> */}
      </Switch>
    </Router>
  );
}

export default Routes;
