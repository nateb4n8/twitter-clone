import React from 'react';

import Main from './components/Main';
import Join from './components/Join';
import CreateAccount from './components/CreateAccount';
import AppTheme from './components/AppTheme';
import Login from './components/Login';
import ComposeTweet from './components/ComposeTweet';

function App() {
  return (
    <AppTheme>
      <ComposeTweet />
    </AppTheme>
  );
}

export default App;
