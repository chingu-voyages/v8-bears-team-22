import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Header, Entry, Secondary } from "./containers";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { connected: false };
  }

  componentDidMount() {
    fetch("/api")
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Connection Error");
        }
      })
      .then(json => {
        if (json) {
          this.setState({ connected: true });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { connected } = this.state;
    return (
      <div className="App">
        <Header />
        Express Server {connected ? "Connected" : "Not Connected"} -
        <Query
          query={gql`
            {
              hello
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            if (data.hello === "Hello World") {
              return "Graphql Server Connected";
            }
          }}
        </Query>
        <div className="Body">
          <Route path="/" exact component={Entry} />
          <Route path="/secondary/" component={Secondary} />
        </div>
      </div>
    );
  }
}

export default App;
