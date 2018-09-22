import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './index';

describe('Spinner', () => {
  it('renders Spinner', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toMatchSnapshot();
  });
});

