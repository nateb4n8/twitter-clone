import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Theme } from './Theme';
import { TweetButton } from './TweetButton';

Enzyme.configure({ adapter: new Adapter() });

describe('<TweetButton />', () => {
  it('renders without crashing', () => {
    mount(
      <Theme>
        <TweetButton />
      </Theme>,
    );
  });
});
