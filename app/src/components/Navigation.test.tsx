import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Navigation } from './Navigation';

Enzyme.configure({ adapter: new Adapter() });

describe.skip('<Navigation />', () => {
  const menuItems = [
    { label: 'Home', link: '#home', icon: <></> },
    { label: 'Explore', link: '#explore', icon: <></> },
    { label: 'Notifications', link: '#notification', icon: <></> },
  ];

  it('renders with menu links', () => {
    const wrapper = mount(<Navigation items={menuItems} />);

    const anchors = wrapper.find('a');

    let matchCount = 0;
    anchors.forEach((anchor) => {
      const text = anchor.text();
      const { href } = anchor.props();
      const matches = menuItems.filter((item) => item.label === text && item.link === href);
      matchCount += matches.length === 1 ? 1 : 0;
    });

    expect(matchCount).toBe(menuItems.length);
  });

  it('renders with a compose Tweet link', () => {
    const wrapper = mount(<Navigation />);

    const anchors = wrapper.find('a').findWhere((a) => a.props().href && a.text() === 'Tweet');

    expect(anchors.length).toBe(1);
  });
});
