/* eslint-env jest */

import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { createMount } from '@material-ui/core/test-utils';
import { MemoryRouter } from 'react-router-dom';

import Login from './Login';

Enzyme.configure({ adapter: new Adapter() });

describe.skip('<Login />', () => {
  let mount;
  let mounter;

  beforeEach(() => {
    sinon.stub(console, 'error');
    mount = createMount();
    mounter = component => mount(<MemoryRouter>{component}</MemoryRouter>);
  });

  afterEach(() => {
    console.error.restore();
    mount.cleanUp();
  });

  it('renders without crashing', () => {
    mounter(<Login />);
  });

  it('renders with an email text input', () => {
    const wrapper = mounter(<Login />);

    const emailInput = wrapper
      .find('input')
      .filterWhere(input => input.props().type === 'email');

    expect(emailInput.exists()).toBe(true);
  });

  it('renders with a password text input', () => {
    const wrapper = mounter(<Login />);

    const passwordInput = wrapper
      .find('input')
      .filterWhere(input => input.props().type === 'password');

    expect(passwordInput.exists()).toBe(true);
  });

  it('renders with a Log in link', () => {
    const wrapper = mounter(<Login />);

    const loginAnchor = wrapper
      .find('a')
      .filterWhere(a => a.props().href === '/login');

    expect(loginAnchor.exists()).toBe(true);
  });
});
