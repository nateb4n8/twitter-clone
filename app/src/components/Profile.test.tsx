import React from 'react';
import { FixMeLater } from '..';
import { Profile } from './Profile';

jest.mock('../utils/api', () => ({
  fetchProfile: () =>
    new Promise((resolve) =>
      resolve({
        name: 'a',
        profileImageSrc: 'b',
        handle: 'c',
        location: 'd',
        // joinDate: 'e',
        followingCount: 1,
        followerCount: 3,
      }),
    ),
}));

describe.skip('<Profile />', () => {
  let mount: FixMeLater;
  let validProps: FixMeLater;

  beforeEach(() => {
    validProps = {
      joinDate: 'e',
    };
  });

  it('renders without crashing', () => {
    mount(<Profile {...validProps} />);
  });

  it('renders with a primary profile image', () => {
    const { container } = mount(<Profile {...validProps} />);

    console.log(container.querySelector('img'));

    // expect(img.exists()).toBe(true);
    // expect(img.props().alt.includes(validProfile.name)).toBe(true);
  });

  it('renders the profile name and handle', () => {
    const wrapper = mount(<Profile {...validProps} />);

    const profileName = wrapper
      .find('h3')
      .filterWhere((item: FixMeLater) => item.text() === validProps.profileName);
    expect(profileName.exists()).toBe(true);

    const handle = wrapper
      .find('span')
      .filterWhere((item: FixMeLater) => item.text() === `@${validProps.handle}`);
    expect(handle.exists()).toBe(true);
  });

  it('renders the location and joined date', () => {
    const wrapper = mount(<Profile {...validProps} />);

    const location = wrapper
      .find('span')
      .filterWhere((item: FixMeLater) => item.text() === validProps.location);
    expect(location.exists()).toBe(true);

    const joinDate = wrapper
      .find('span')
      .filterWhere((item: FixMeLater) => item.text() === `Joined ${validProps.joinDate}`);
    expect(joinDate.exists()).toBe(true);
  });

  it('renders following and follower counts', () => {
    const wrapper = mount(<Profile {...validProps} />);

    const { followingAmt, followerAmt } = validProps;

    const followingText = wrapper
      .find('span')
      .filterWhere((item: FixMeLater) => item.text() === `${followingAmt} Following`);
    expect(followingText.exists()).toBe(true);

    const followerText = wrapper
      .find('span')
      .filterWhere((item: FixMeLater) => item.text() === `${followerAmt} Followers`);
    expect(followerText.exists()).toBe(true);
  });

  it('renders an edit profile button', () => {
    const wrapper = mount(<Profile {...validProps} />);

    const editButton = wrapper
      .find('button')
      .filterWhere((btn: FixMeLater) => btn.props().name === 'editProfile');
    expect(editButton.exists()).toBe(true);
  });
});
