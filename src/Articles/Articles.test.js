import React from 'react';
import { render } from 'enzyme';
import Articles from './index';

const data = [
  {
    headline: {
      main: 'fake-headline',
    },
    snippet: 'fake-snippet',
    web_url: 'fake-url',
    multimedia: [{
      subtype: 'blog427',
      url: 'fake-url',
    }],
  },
  {
    headline: {
      main: 'fake-headline',
    },
    snippet: 'fake-snippet',
    web_url: 'fake-url',
    multimedia: [{
      subtype: 'blog427',
      url: 'fake-url',
    }],
  },
  {
    headline: {
      main: 'fake-headline',
    },
    snippet: 'fake-snippet',
    web_url: 'fake-url',
    multimedia: [{
      subtype: 'blog427',
      url: 'fake-url',
    }],
  },
];

it('renders 3 Articles', () => {
  const wrapper = render(<Articles data={data} />);
  const articles = wrapper.find('article');
  
  expect(articles).toHaveLength(3)
});

