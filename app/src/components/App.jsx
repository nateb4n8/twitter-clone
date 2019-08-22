import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import AppTheme from './AppTheme';
// import EditProfile from './EditProfile';
// import Profile from './Profile';
// import ComposeTweet from './ComposeTweet';
// import Main from './Main';
import Join from './Join';
import CreateAccount from './CreateAccount';
import Login from './Login';

// import AuthContext from './AuthContext';

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
    <AppTheme>
      {/* <Profile {...profileProps} /> */}
      {/* <CreateAccount /> */}

      <Router>
        <Switch>
          <Route path="/" exact component={Join} />
          <Route path="/signup" component={CreateAccount} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </AppTheme>
  );
}

export default App;
