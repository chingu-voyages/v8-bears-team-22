import React from 'react';
import AccountScreen from "./AccountScreen";
import {shallow} from 'enzyme';

describe('<AccountScreen /> component', () => {
  it('renders component structure', () => {
    const wrapper = shallow(<AccountScreen />);
    const form = wrapper.find('form');

    expect(form).not.toBeNull();
  });
});
