import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import { Login } from './Login';

Enzyme.configure({ adapter: new Adapter() });

describe('<Login />', () => {
  const arrange = () =>
    mount(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

  it('renders without crashing', () => {
    arrange();
  });

  it('renders with an email text input', () => {
    const wrapper = arrange();

    const emailInput = wrapper.find('input').filterWhere((input) => input.props().type === 'email');

    expect(emailInput.exists()).toBe(true);
  });

  it('renders with a password text input', () => {
    const wrapper = arrange();

    const passwordInput = wrapper
      .find('input')
      .filterWhere((input) => input.props().type === 'password');

    expect(passwordInput.exists()).toBe(true);
  });

  it('renders with a Log in link', () => {
    const wrapper = arrange();

    const loginAnchor = wrapper.find('a').filterWhere((a) => a.props().href === '/login');

    expect(loginAnchor.exists()).toBe(true);
  });
});
