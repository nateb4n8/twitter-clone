/* eslint-env jest */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { createMount } from '@material-ui/core/test-utils';

import Join from './Join';

Enzyme.configure({ adapter: new Adapter() });

describe('<Login />', () => {
  let mount;

  beforeEach(() => {
    sinon.stub(console, 'error');
    mount = createMount();
  });

  afterEach(() => {
    console.error.restore();
    mount.cleanUp();
  });

  it('renders without crashing', () => {
    mount(<MemoryRouter><Join /></MemoryRouter>);
  });

  it('renders with a Log In link', () => {
    const wrapper = mount(<MemoryRouter><Join /></MemoryRouter>);
    const loginAnchor = wrapper
      .find('a')
      .filterWhere(a => a.props().href === '/login');

    expect(loginAnchor.exists()).toBe(true);
  });

  it('renders with a Sign Up link', () => {
    const wrapper = mount(<MemoryRouter><Join /></MemoryRouter>);
    const signupAnchor = wrapper
      .find('a')
      .filterWhere(a => a.props().href === '/signup');

    expect(signupAnchor.exists()).toBe(true);
  });
});
