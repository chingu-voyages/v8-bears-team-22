import React from 'react';
import { shallow } from 'enzyme';
import CircularProgressBar from './CircularProgressBar';


describe('<CircularProgressBar /> component', () => {
  it('renders svg element', () => {
    const wrapper = shallow(<CircularProgressBar />);
    expect(wrapper.exists('svg')).toBe(true);
  });
});
