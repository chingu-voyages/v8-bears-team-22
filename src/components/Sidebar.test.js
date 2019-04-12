import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Sidebar from './Sidebar';


describe('<Sidebar /> component', () => {
  const client = new ApolloClient();

  it('renders component structure', () => {
    const wrapper = mount(
      <ApolloProvider client={client}>
        <Router>
          <Sidebar open handleDrawerClose={() => {}} />
        </Router>
      </ApolloProvider>,
    );
    expect(wrapper.exists('h4')).toBe(true);
    expect(wrapper.exists('svg')).toBe(true);
  });
});
