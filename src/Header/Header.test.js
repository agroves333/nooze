import React from 'react';
import { render } from 'enzyme';
import Header from './index';

const history = [
  {
    query: 'fake-query',
    time: 1234567890,
  },
  {
    query: 'fake-query',
    time: 1234567890,
  },
  {
    query: 'fake-query',
    time: 1234567890,
  },
];

it('renders Header', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});

it('renders history dropdown with content when clicked', () => {
  global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  // global.localStorage.getItem.mockReturnValueOnce(JSON.stringify(history));
  const wrapper = render(<Header searchHistory={history}/>);
  const historyDropdown = wrapper.find('li.dropdown').get(1);
  const anchor = historyDropdown.find('a.nav-link');
  const dropdownItems = historyDropdown.find('button.dropdown-item');
  anchor.simulate('click');
  expect(dropdownItems).toHaveLength(3);
});
