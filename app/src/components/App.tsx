import React, { ReactElement } from 'react';
import { Theme } from './Theme';
import { Auth } from './AuthContext';
import { Routes } from './Routes';

export function App(): ReactElement {
  return (
    <Theme>
      <Auth>
        <Routes />
      </Auth>
    </Theme>
  );
}
