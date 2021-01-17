import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { AuthRoute } from './AuthRoute';
import { CreateAccount } from './CreateAccount';
import Join from './Join';
import { LoginForm } from './LoginForm';
import { Main } from './Main';
import { useSessionContext } from './session/Session';

export function Routes(): ReactElement {
  const { accessToken } = useSessionContext();
  // if (accessToken) return <Loading />;

  return (
    <Router>
      <Switch>
        <Route
          path="/signup"
          render={() => (accessToken ? <Redirect to="/home" /> : <CreateAccount />)}
        />
        <Route
          path="/login"
          render={() => (accessToken ? <Redirect to="/home" /> : <LoginForm />)}
        />
        <AuthRoute path="/home" component={Main} />
        <AuthRoute path="/:handle" component={Main} />
        <Route exact path="/" render={() => (accessToken ? <Redirect to="/home" /> : <Join />)} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}
