import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './index';
import axios from "axios";

const response = {
  data: {
    response: {
      docs: [
        {
          headline: {
            main: 'fake-headline',
          },
          snippet: 'fake-snippet',
          web_url: 'fake-url',
          multimedia: [{
            subtype: 'blog427',
            url: 'fake-url',
          }],
        },
      ]
    }
  }
};

describe('App', () => {
  it('renders App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('fetches initial results when rendered', async () => {
    
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    
    axios.get.mockImplementationOnce(() => Promise.resolve(response));
    
    const div = document.createElement('div');
    div.setAttribute("id", "saveSearchButton");
    document.body.appendChild(div);
    
    const wrapper = await mount(<App/>);
    
    expect(wrapper.state('articles')).toHaveLength(1);
  });
  
});