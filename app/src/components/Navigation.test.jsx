/* eslint-env jest */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

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

  beforeEach(() => {
    sinon.stub(console, 'error');
  });

  afterEach(() => {
    console.error.restore();
  });

  it('renders without crashing', () => {
    mount(<Navigation />);
  });

  it('renders with menu links', () => {
    const wrapper = mount(<Navigation items={menuItems} />);

    const anchors = wrapper.find('a');

    expect(anchors.length).toBe(3);
    anchors.forEach((anchor) => {
      expect(labels).toContain(anchor.text());
      expect(links).toContain(anchor.props().href);
    });
  });
});
