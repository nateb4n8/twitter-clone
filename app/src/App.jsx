import React from 'react';

import AppTheme from './components/AppTheme';
import EditProfile from './components/EditProfile';
// import Profile from './components/Profile';
// import ComposeTweet from './components/ComposeTweet';
// import Main from './components/Main';
// import Join from './components/Join';
// import CreateAccount from './components/CreateAccount';
// import Login from './components/Login';

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
      <EditProfile />
    </AppTheme>
  );
}

export default App;
