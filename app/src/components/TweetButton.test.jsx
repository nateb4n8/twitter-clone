/* eslint-env jest */

import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { createMount } from '@material-ui/core/test-utils';

import TweetButton from './TweetButton';

Enzyme.configure({ adapter: new Adapter() });

describe('<TweetButton />', () => {
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
    mount(<TweetButton />);
  });
});
