/* eslint-env jest */

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Auth } from './AuthContext';
import { CreateAccount } from './CreateAccount';
import { Theme } from './Theme';

Enzyme.configure({ adapter: new Adapter() });

describe('<CreateAccount />', () => {
  const arrange = () =>
    mount(
      <Auth>
        <MemoryRouter>
          <Theme>
            <CreateAccount />
          </Theme>
        </MemoryRouter>
      </Auth>,
    );

  it('renders with a `submit` button', () => {
    const wrapper = arrange();

    const submitButton = wrapper.find('button').find({ name: 'submit' });

    expect(submitButton.exists()).toBe(true);
  });

  it.skip('should call onClick callback when clicked', () => {
    const wrapper = arrange();

    const submitButton = wrapper.find('button').find({ name: 'submit' });
    submitButton.simulate('click');

    expect(submitButton.exists()).toBe(true);
  });

  it('renders with a `name` input', () => {
    const wrapper = arrange();

    const nameInput = wrapper.find('input').find({ name: 'name' });

    expect(nameInput.length).toBe(1);
  });

  it('renders with a `email` input', () => {
    const wrapper = arrange();

    const emailInput = wrapper.find('input').find({ name: 'email' });

    expect(emailInput.length).toBe(1);
  });

  it('renders with a `password` input', () => {
    const wrapper = arrange();

    const passwordInput = wrapper.find('input').find({ name: 'password' });

    expect(passwordInput.exists()).toBe(true);
  });

  it('renders with a `confirmPassword` input', () => {
    const wrapper = arrange();

    const confirmPasswordInput = wrapper
      .find('input')
      .find({ name: 'confirmPassword' });

    expect(confirmPasswordInput.exists()).toBe(true);
  });
});
