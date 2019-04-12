import React from 'react';
import { shallow } from 'enzyme';
import AccountScreen from './AccountScreen';


describe('<AccountScreen /> component', () => {
  it('renders component structure', () => {
    const wrapper = shallow(<AccountScreen />);
    const form = wrapper.find('form');

    expect(form).not.toBeNull();
  });
});
