import React from 'react';
import { shallow } from 'enzyme';
import Article from './index';

it('renders without crashing', () => {
  shallow(<Article />)
});
