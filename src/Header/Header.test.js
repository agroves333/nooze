import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

it('renders Header', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});
