import React from 'react';
import AppTheme from './AppTheme';
import Auth from './AuthContext';
import Routes from './Routes';

function App() {
  return (
    <AppTheme>
      <Auth>
        <Routes />
      </Auth>
    </AppTheme>
  );
}

export default App;
