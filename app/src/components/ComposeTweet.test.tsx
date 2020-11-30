import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ComposeTweet } from './ComposeTweet';
import { Theme } from './Theme';

Enzyme.configure({ adapter: new Adapter() });

describe('<ComposeTweet />', () => {
  let mockOnClose: jest.Mock;
  const originalConsoleError = console.error;

  beforeEach(() => {
    mockOnClose = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  const arrange = () =>
    mount(
      <Theme>
        <ComposeTweet open onClose={mockOnClose} />
      </Theme>,
    );

  it('renders with a `Tweet` button', () => {
    const wrapper = arrange();

    const tweetButton = wrapper.find('button').find({ name: 'tweet-submit' });

    expect(tweetButton.exists()).toBe(true);
  });

  it('renders with a `back` button', () => {
    const wrapper = arrange();

    const goBackButton = wrapper.find('button').find({ name: 'go-back' });

    expect(goBackButton.exists()).toBe(true);
  });

  it('renders with a tweet text field', () => {
    const wrapper = arrange();

    const textInput = wrapper.find('textarea').find({ name: 'tweet-content' });

    expect(textInput.exists()).toBe(true);
  });

  it('renders with an attach file button', () => {
    const wrapper = arrange();

    const fileInput = wrapper.find('input').find({ type: 'file' });

    expect(fileInput.exists()).toBe(true);
  });

  it('renders with a gif button', () => {
    const wrapper = arrange();

    const gifButton = wrapper.find('button').find({ name: 'add-gif' });

    expect(gifButton.exists()).toBe(true);
  });

  it('renders with a poll button', () => {
    const wrapper = arrange();

    const pollButton = wrapper.find('button').find({ name: 'add-poll' });

    expect(pollButton.exists()).toBe(true);
  });

  it('renders with an emoji button', () => {
    const wrapper = arrange();

    const emojiButton = wrapper.find('button').find({ name: 'add-emoji' });

    expect(emojiButton.exists()).toBe(true);
  });
});
