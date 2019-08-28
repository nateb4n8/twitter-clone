import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AppTheme from './AppTheme';
// import EditProfile from './EditProfile';
import Profile from './Profile';
// import ComposeTweet from './ComposeTweet';
// import Main from './Main';
import Join from './Join';
import CreateAccount from './CreateAccount';
import Login from './Login';
import Auth, { authContext } from './AuthContext';
import AuthRoute from './AuthRoute';
import PublicRoute from './PublicRoute';

const profileProps = {
  primaryImageSrc: 'https://www.nathanacosta.com/static/media/nathan.3950ec4b.jpg',
  profileName: 'Nathan Acosta',
  handle: 'Logic0verflow',
  location: 'New Mexico',
  joinDate: 'June 2010',
  followingAmt: 18,
  followerAmt: 0,
};

function App() {
  return (
    <Auth>
      <AppTheme>
        <Router>
          <Switch>
            <Route path="/" exact component={Join} />
            <PublicRoute path="/signup" component={CreateAccount} />
            <PublicRoute path="/login" component={Login} />
            <AuthRoute path="/profile" component={() => <Profile {...profileProps} />} />
          </Switch>
        </Router>
      </AppTheme>
    </Auth>
  );
}

export default App;
