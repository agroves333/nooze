import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

it('renders App', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
