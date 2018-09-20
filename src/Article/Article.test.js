import React from 'react';
import { shallow } from 'enzyme';
import Article from './index';

const baseData = {
  headline: {
    main: 'fake-headline',
  },
  snippet: 'fake-snippet',
  web_url: 'fake-url',
  multimedia: [{
    subtype: 'blog427',
    url: 'fake-url',
  }],
};

it('renders an Article', () => {
  const wrapper = shallow(<Article data={baseData} />);
  expect(wrapper).toMatchSnapshot();
});

it('does not render image element if not available', () => {
  const wrapper = shallow(<Article data={{ ...baseData, multimedia: [] }} />);
  const image = wrapper.find('img');
  expect(image.exists()).toBe(false);
});

it('renders an image element if available', () => {
  const wrapper = shallow(<Article data={baseData} />);
  const image = wrapper.find('img');
  expect(image.exists()).toBe(true);
});

it('open link by calling window.open', () => {
  global.open = jest.fn();
  const wrapper = shallow(<Article data={baseData}/>);
  wrapper.find('article').simulate('click');
  expect(global.open).toBeCalledWith('fake-url');
});
