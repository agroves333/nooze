import React from 'react';
import { shallow } from 'enzyme';
import Article from './index';

it('renders an Article', () => {
  const wrapper = shallow(<Article />);
  expect(wrapper).toMatchSnapshot();
});
