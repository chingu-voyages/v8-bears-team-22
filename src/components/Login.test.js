import React from 'react';
import { shallow } from 'enzyme';
// import { valueToObjectRepresentation } from 'apollo-utilities';
import Login from './Login';

describe('<Login /> component', () => {
  it('renders form element', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists('form')).toBe(true);
  });
});
