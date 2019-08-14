/* eslint-env jest */

import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { createMount } from '@material-ui/core/test-utils';

import Profile from './Profile';

Enzyme.configure({ adapter: new Adapter() });

describe('<Profile />', () => {
  let mount;
  let validProps;

  beforeEach(() => {
    validProps = {
      profileName: 'a',
      primaryImageSrc: 'b',
      handle: 'c',
      location: 'd',
      joinDate: 'e',
      followingAmt: 1,
      followerAmt: 3,
    };
    sinon.stub(console, 'error');
    mount = createMount();
  });

  afterEach(() => {
    console.error.restore();
    mount.cleanUp();
  });

  it('renders without crashing', () => {
    mount(<Profile {...validProps} />);
  });

  it('renders with a primary profile image', () => {
    const wrapper = mount(<Profile {...validProps} />);

    const img = wrapper.find({ src: validProps.primaryImageSrc });
    expect(img.exists()).toBe(true);
    expect(img.props().alt.includes(validProps.profileName)).toBe(true);
  });

  it('renders the profile name and handle', () => {
    const wrapper = mount(<Profile {...validProps} />);

    const profileName = wrapper
      .find('h3')
      .filterWhere(item => item.text() === validProps.profileName);
    expect(profileName.exists()).toBe(true);

    const handle = wrapper
      .find('span')
      .filterWhere(item => item.text() === `@${validProps.handle}`);
    expect(handle.exists()).toBe(true);
  });

  it('renders the location and joined date', () => {
    const wrapper = mount(<Profile {...validProps} />);

    const location = wrapper
      .find('span')
      .filterWhere(item => item.text() === validProps.location);
    expect(location.exists()).toBe(true);

    const joinDate = wrapper
      .find('span')
      .filterWhere(item => item.text() === `Joined ${validProps.joinDate}`);
    expect(joinDate.exists()).toBe(true);
  });

  it('renders following and follower counts', () => {
    const wrapper = mount(<Profile {...validProps} />);

    const { followingAmt, followerAmt } = validProps;

    const followingText = wrapper
      .find('span')
      .filterWhere(item => item.text() === `${followingAmt} Following`);
    expect(followingText.exists()).toBe(true);

    const followerText = wrapper
      .find('span')
      .filterWhere(item => item.text() === `${followerAmt} Followers`);
    expect(followerText.exists()).toBe(true);
  });

  it('renders an edit profile button', () => {
    const wrapper = mount(<Profile {...validProps} />);

    const editButton = wrapper
      .find('button')
      .filterWhere(btn => btn.props().name === 'editProfile');
    expect(editButton.exists()).toBe(true);
  });
});
