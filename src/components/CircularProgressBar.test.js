import React from 'react';
import CircularProgressBar from "./CircularProgressBar";
import {shallow} from 'enzyme';

describe('<CircularProgressBar /> component', () => {
  it('renders svg element', () => {
    const wrapper = shallow(<CircularProgressBar />);
    expect(wrapper.exists('svg')).toBe(true);
  });
});
