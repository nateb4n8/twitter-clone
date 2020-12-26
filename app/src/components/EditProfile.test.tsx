import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { authContext } from './AuthContext';
import { EditProfile } from './EditProfile';
import { Theme } from './Theme';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('./AuthContext');

describe('<EditProfile />', () => {
  const arrange = () =>
    mount(
      <MemoryRouter>
        <Theme>
          <authContext.Provider
            value={{
              isAuthenticated: true,
              authenticating: false,
              setProfile: jest.fn(),
              profile: {
                bannerImageId: '',
                followerCount: '0',
                followingCount: '0',
                handle: '',
                joinDate: new Date().toDateString(),
                location: '',
                name: '',
                profileImageId: '',
                website: '',
              },
            }}
          >
            <EditProfile open onClose={jest.fn()} />
          </authContext.Provider>
        </Theme>
      </MemoryRouter>,
    );

  it('renders with a `Save` button', () => {
    const wrapper = arrange();

    const saveButton = wrapper.find('button').find({ name: 'saveProfile' });

    expect(saveButton.exists()).toBe(true);
  });

  it('renders with a `close` button', () => {
    const wrapper = arrange();

    const closeButton = wrapper.find('button').find({ name: 'close' });

    expect(closeButton.exists()).toBe(true);
  });

  it('renders an edit button for profile image', () => {
    const wrapper = arrange();

    const editProfileImageButton = wrapper.find('button').find({ name: 'editProfileImage' });

    expect(editProfileImageButton.exists()).toBe(true);
  });

  it('renders a name text field', () => {
    const wrapper = arrange();

    const nameTextField = wrapper.find('input').find({ name: 'name' });

    expect(nameTextField.exists()).toBe(true);
  });

  it.skip('renders a bio text field', () => {
    const wrapper = arrange();

    const bioTextField = wrapper.find('input').find({ name: 'bio' });

    expect(bioTextField.exists()).toBe(true);
  });

  it('renders a location text field', () => {
    const wrapper = arrange();

    const locationTextField = wrapper.find('input').find({ name: 'location' });

    expect(locationTextField.exists()).toBe(true);
  });

  it('renders a website text field', () => {
    const wrapper = arrange();

    const websiteTextField = wrapper.find('input').find({ name: 'website' });

    expect(websiteTextField.exists()).toBe(true);
  });
});
