import React from 'react';
import Login from "./Login";
import {shallow} from 'enzyme';
import { valueToObjectRepresentation } from 'apollo-utilities';

describe('<Login /> component', () => {
  it('renders form element', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists('form')).toBe(true);
  });
});