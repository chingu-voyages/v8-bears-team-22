import React from "react";
import Sidebar from "./Sidebar";
import {shallow, mount} from 'enzyme';
import { BrowserRouter as Router } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";


describe('<Sidebar /> component', () => {
  
  const client = new ApolloClient();

  it('renders component structure', () => {
    const wrapper = mount(
      <ApolloProvider client={client}>
        <Router>
          <Sidebar open={true} handleDrawerClose={() => {}} />
        </Router>
      </ApolloProvider>);
    expect(wrapper.exists('h4')).toBe(true);
    expect(wrapper.exists('svg')).toBe(true);
  });
});
