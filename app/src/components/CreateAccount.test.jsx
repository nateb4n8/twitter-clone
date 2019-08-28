/* eslint-env jest */

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { createMount } from '@material-ui/core/test-utils';
import { MemoryRouter } from 'react-router-dom';

import CreateAccount from './CreateAccount';
import AppTheme from './AppTheme';
import Auth from './AuthContext';

Enzyme.configure({ adapter: new Adapter() });

describe('<CreateAccount />', () => {
  let mount;
  let muiMount;

  beforeEach(() => {
    sinon.stub(console, 'error');

    muiMount = createMount();

    mount = component => muiMount(
      shallow(
        <Auth>
          <MemoryRouter>
            <AppTheme>{component}</AppTheme>
          </MemoryRouter>
        </Auth>,
      ).get(0),
    );
  });

  afterEach(() => {
    console.error.restore();

    muiMount.cleanUp();
  });

  it('renders with a `submit` button', () => {
    const wrapper = mount(<CreateAccount />);

    const submitButton = wrapper
      .find('button')
      .filterWhere(btn => btn.props().name === 'submit');

    expect(submitButton.exists()).toBe(true);
  });

  it.skip('should call onClick callback when clicked', () => {
    const wrapper = mount(<CreateAccount />);

    const submitButton = wrapper
      .find('button')
      .filterWhere(btn => btn.props().name === 'submit');
    submitButton.simulate('click');

    expect(submitButton.exists()).toBe(true);
  });

  it('renders with a `name` input', () => {
    const wrapper = mount(<CreateAccount />);

    const nameInput = wrapper
      .find('input')
      .filterWhere(input => input.props().name === 'name');

    expect(nameInput.length).toBe(1);
  });

  it('renders with a `email` input', () => {
    const wrapper = mount(<CreateAccount />);

    const emailInput = wrapper
      .find('input')
      .filterWhere(input => input.props().name === 'email');

    expect(emailInput.length).toBe(1);
  });

  it('renders with a `password` input', () => {
    const wrapper = mount(<CreateAccount />);

    const passwordInput = wrapper
      .find('input')
      .filterWhere(input => input.props().name === 'password');

    expect(passwordInput.exists()).toBe(true);
  });

  it('renders with a `confirmPassword` input', () => {
    const wrapper = mount(<CreateAccount />);

    const confirmPasswordInput = wrapper
      .find('input')
      .filterWhere(input => input.props().name === 'confirmPassword');

    expect(confirmPasswordInput.exists()).toBe(true);
  });
});
