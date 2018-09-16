import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './index';

it('renders without crashing', () => {
  shallow(<Spinner />)
});
