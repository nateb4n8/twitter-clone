/* eslint-env jest */

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { createMount } from '@material-ui/core/test-utils';

import CreateAccount from './CreateAccount';
import AppTheme from './AppTheme';

Enzyme.configure({ adapter: new Adapter() });

describe('<CreateAccount />', () => {
  let mount;
  let muiMount;

  beforeEach(() => {
    sinon.stub(console, 'error');

    muiMount = createMount();
    mount = elem => muiMount(shallow(<AppTheme>{elem}</AppTheme>).get(0));
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

  it('renders with a `phone` input', () => {
    const wrapper = mount(<CreateAccount />);

    const phoneInput = wrapper
      .find('input')
      .filterWhere(input => input.props().name === 'phone');

    expect(phoneInput.length).toBe(1);
  });

  it('renders with a `email` input', () => {
    const wrapper = mount(<CreateAccount />);

    const emailInput = wrapper
      .find('input')
      .filterWhere(input => input.props().name === 'email');

    expect(emailInput.length).toBe(1);
  });

  it('renders with a `birth-month` input', () => {
    const wrapper = mount(<CreateAccount />);

    const monthInput = wrapper
      .find('select')
      .filterWhere(select => select.props().name === 'birth-month');

    expect(monthInput.length).toBe(1);
  });

  it('renders with a `birth-day` input', () => {
    const wrapper = mount(<CreateAccount />);

    const dayInput = wrapper
      .find('select')
      .filterWhere(select => select.props().name === 'birth-day');

    expect(dayInput.length).toBe(1);
  });

  it('renders with a `birth-year` input', () => {
    const wrapper = mount(<CreateAccount />);

    const yearInput = wrapper
      .find('select')
      .filterWhere(select => select.props().name === 'birth-year');

    expect(yearInput.length).toBe(1);
  });

  it('should render with all 12 month options for `birth-month` input', () => {
    const wrapper = mount(<CreateAccount />);

    // get options, skip the blank default option
    const monthOptions = wrapper
      .find('select')
      .filterWhere(select => select.props().name === 'birth-month')
      .find('option')
      .filterWhere(option => option.props().value !== '');

    expect(monthOptions.length).toBe(12);
  });

  it('should render with 120 year options for `birth-year` input', () => {
    const wrapper = mount(<CreateAccount />);

    // get options, skip the blank default option
    const yearOptions = wrapper
      .find('select')
      .filterWhere(select => select.props().name === 'birth-year')
      .find('option')
      .filterWhere(option => option.props().value !== '');

    expect(yearOptions.length).toBe(120);
  });
});
