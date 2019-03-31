import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "./App";

const client = new ApolloClient();

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
