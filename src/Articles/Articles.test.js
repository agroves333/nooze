import React from 'react';
import { shallow } from 'enzyme';
import Articles from './index';
import Article from "../Article";

it('renders without crashing', () => {
  shallow(<Articles />)
});
