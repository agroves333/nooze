import React from 'react';
import { shallow } from 'enzyme';
import Articles from './index';

it('renders Articles', () => {
  const wrapper = shallow(<Articles />);
  expect(wrapper).toMatchSnapshot();
});
