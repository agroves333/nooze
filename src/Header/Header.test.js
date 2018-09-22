import React from 'react';
import { render, shallow } from 'enzyme';
import Header from './index';

const savedSearches = ['fake-search', 'fake-search', 'fake-search'];

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
describe('Header', () => {
  
  beforeEach(() => {
    const localStorageMock = (() => {
      let store = {};
    
      return {
        getItem: key => {
          return store[key] || null;
        },
        setItem: (key, value) => {
          store[key] = value.toString();
        },
        clear: () => {
          store = {};
        }
      };
    })();
  
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
  });
  
  it('renders Header', () => {
    const wrapper = shallow(<Header/>);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('renders history dropdown with 3 items', () => {
    const wrapper = render(<Header searchHistory={history}/>);
    const dropdown = wrapper.find('li.dropdown').eq(1);
    const dropdownItems = dropdown.find('button.dropdown-item');
    expect(dropdownItems).toHaveLength(3);
  });
  
  it('renders saved searches dropdown with 3 items', () => {
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    const wrapper = render(<Header/>);
    const dropdown = wrapper.find('li.dropdown').eq(0);
    const dropdownItems = dropdown.find('button.dropdown-item');
    expect(dropdownItems).toHaveLength(3);
  });
});
