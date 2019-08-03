/* eslint-env jest */

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { createMount } from '@material-ui/core/test-utils';

import ComposeTweet from './ComposeTweet';
import AppTheme from './AppTheme';

Enzyme.configure({ adapter: new Adapter() });

describe('<ComposeTweet />', () => {
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

  it('renders with a `Tweet` button', () => {
    const wrapper = mount(<ComposeTweet />);

    const tweetButton = wrapper
      .find('button')
      .filterWhere(btn => btn.props().name === 'tweet-submit');

    expect(tweetButton.exists()).toBe(true);
  });

  it('renders with a `back` button', () => {
    const wrapper = mount(<ComposeTweet />);

    const goBackButton = wrapper
      .find('button')
      .filterWhere(btn => btn.props().name === 'go-back');

    expect(goBackButton.exists()).toBe(true);
  });

  it('renders with a tweet text field', () => {
    const wrapper = mount(<ComposeTweet />);

    const textInput = wrapper
      .find('input')
      .filterWhere(input => input.props().name === 'tweet-content');

    expect(textInput.exists()).toBe(true);
  });

  it('renders with an attach file button', () => {
    const wrapper = mount(<ComposeTweet />);

    const fileInput = wrapper
      .find('input')
      .filterWhere(input => input.props().type === 'file');

    expect(fileInput.exists()).toBe(true);
  });

  it('renders with a gif button', () => {
    const wrapper = mount(<ComposeTweet />);

    const gifButton = wrapper
      .find('button')
      .filterWhere(button => button.props().name === 'add-gif');

    expect(gifButton.exists()).toBe(true);
  });

  it('renders with a poll button', () => {
    const wrapper = mount(<ComposeTweet />);

    const pollButton = wrapper
      .find('button')
      .filterWhere(button => button.props().name === 'add-poll');

    expect(pollButton.exists()).toBe(true);
  });

  it('renders with an emoji button', () => {
    const wrapper = mount(<ComposeTweet />);

    const emojiButton = wrapper
      .find('button')
      .filterWhere(button => button.props().name === 'add-emoji');

    expect(emojiButton.exists()).toBe(true);
  });
});
