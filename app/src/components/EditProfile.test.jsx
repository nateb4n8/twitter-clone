/* eslint-env jest */

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { createMount } from '@material-ui/core/test-utils';

import EditProfile from './EditProfile';
import AppTheme from './AppTheme';

Enzyme.configure({ adapter: new Adapter() });

describe.skip('<EditProfile />', () => {
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

  it('renders with a `Save` button', () => {
    const wrapper = mount(<EditProfile />);
    const saveButton = wrapper
      .find('button')
      .filterWhere(btn => btn.props().name === 'saveProfile');

    expect(saveButton.exists()).toBe(true);
  });

  it('renders with a `close` button', () => {
    const wrapper = mount(<EditProfile />);
    const closeButton = wrapper
      .find('button')
      .filterWhere(btn => btn.props().name === 'close');

    expect(closeButton.exists()).toBe(true);
  });

  it('renders an edit button for profile image', () => {
    const wrapper = mount(<EditProfile />);
    const editProfileImageButton = wrapper
      .find('button')
      .filterWhere(btn => btn.props().name === 'editProfileImage');

    expect(editProfileImageButton.exists()).toBe(true);
  });

  it('renders a name text field', () => {
    const wrapper = mount(<EditProfile />);
    const nameTextField = wrapper
      .find('input')
      .filterWhere(input => input.props().name === 'name');

    expect(nameTextField.exists()).toBe(true);
  });

  it('renders a bio text field', () => {
    const wrapper = mount(<EditProfile />);
    const bioTextField = wrapper
      .find('input')
      .filterWhere(input => input.props().name === 'bio');

    expect(bioTextField.exists()).toBe(true);
  });

  it('renders a location text field', () => {
    const wrapper = mount(<EditProfile />);
    const locationTextField = wrapper
      .find('input')
      .filterWhere(input => input.props().name === 'location');

    expect(locationTextField.exists()).toBe(true);
  });

  it('renders a website text field', () => {
    const wrapper = mount(<EditProfile />);
    const websiteTextField = wrapper
      .find('input')
      .filterWhere(input => input.props().name === 'website');

    expect(websiteTextField.exists()).toBe(true);
  });
});
