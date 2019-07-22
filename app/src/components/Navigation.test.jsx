/* eslint-env jest */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import { createMount } from '@material-ui/core/test-utils';

import Navigation from './Navigation';

Enzyme.configure({ adapter: new Adapter() });

describe('<Navigation />', () => {
  const menuItems = [
    { label: 'Home', link: '#home' },
    { label: 'Explore', link: '#explore' },
    { label: 'Notifications', link: '#notification' },
  ];
  const labels = menuItems.map(i => i.label);
  const links = menuItems.map(i => i.link);

  let mount;

  beforeEach(() => {
    sinon.stub(console, 'error');

    mount = createMount();
  });

  afterEach(() => {
    console.error.restore();

    mount.cleanUp();
  });

  it('renders with menu links', () => {
    const wrapper = mount(<Navigation items={menuItems} />);

    const anchors = wrapper.find('a');

    let matchCount = 0;
    anchors.forEach((anchor) => {
      const text = anchor.text();
      const { href } = anchor.props();
      const matches = menuItems.filter(item => item.label === text && item.link === href);
      matchCount += matches.length === 1 ? 1 : 0;
    });

    expect(matchCount).toBe(menuItems.length);
  });

  it('renders with a compose Tweet link', () => {
    const wrapper = mount(<Navigation />);

    const anchors = wrapper.find('a').findWhere(a => a.props().href && a.text() === 'Tweet');

    expect(anchors.length).toBe(1);
  });
});
