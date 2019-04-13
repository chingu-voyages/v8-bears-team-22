import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './App.css';
import 'typeface-roboto';
import { CssBaseline } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AccountScreen from './components/AccountScreen';
import { Header, Entry, Secondary } from './containers';
import Login from './components/Login';
import history from './history';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      signedIn: false,
      email: 'placeholder@appConstructor.com',
      name: 'Not John Doe',
      progress: 26,
      open: false,
    };
  }

  componentDidMount() {
    fetch('/api')
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error('Connection Error');
      })
      .then((json) => {
        if (json) {
          this.setState({ connected: true });
        }
      })
      .catch(err => console.log(err)); // eslint-disable-line no-console
  }

  logInFunction = (email, name, progress) => {
    this.setState({
      email,
      name,
      progress,
      signedIn: true,
    });
  }

  logOutFunction = () => {
    this.setState({
      signedIn: false,
      email: 'placeholder@appLogOutFunction.com',
      name: 'Logged Out',
      progress: 0,
      open: false,
    }, () => {
      history.push('/');
    });
  }

  deleteAccountFunction = (email) => {
    const { signedIn } = this.state;
    const { client } = this.props;
    if (signedIn) {
      return client.mutate({
        mutation: gql`
            mutation{
                deleteUser(email:"${email}")
            }
            `,
      }).then((response) => {
        if (response.data.deleteUser > 0) {
          this.logOutFunction();
          return 'User Deleted';
        }
        // Add connection error
        // Add general error
        return 'Error: User Not Deleted';
      });
    }
    return 'Not Logged In';
  }

  resetProgressFunction = (email) => {
    const { signedIn } = this.state;
    const { client } = this.props;
    if (signedIn) {
      return client.mutate({
        mutation: gql`
          mutation{
              resetProgress(email:"${email}")
          }
          `,
      }).then((response) => {
        if (response.data.resetProgress > 0) {
          this.setState({ progress: 0 });
          return 'Progress Reset';
        }
        // Add connection error
        // Add general error
        return 'Error: Progress Not Reset';
      });
    }
    return 'Not Logged In';
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  updateDetailsFunction = (name, newEmail, password) => {
    const { signedIn, email } = this.state;
    const { client } = this.props;
    if (signedIn) {
      return client.mutate({
        mutation: gql`
        mutation{
            updateDetails(email:"${email}",newEmail:"${newEmail}",password:"${password}",name:"${name}")
        }
        `,
      }).then((response) => {
        if (response.data.updateDetails > 0) {
          this.setState({ name, email });
          //   history.push('/account');
          return 'Details Updated';
        }
        // Add email existing
        // Add connection error
        // Add general error
        return 'Error: Details Not Updated';
      });
    }
    return 'Not Logged In';
  }

  render() {
    const {
      connected, name, progress, email, open,
    } = this.state;
    return (
      <div className="App">
        <CssBaseline />
        <Header
          name={name}
          progress={progress}
          open={open}
          handleDrawerOpen={this.handleDrawerOpen}
          handleDrawerClose={this.handleDrawerClose}
        />
        Express Server
        {' '}
        {connected ? 'Connected' : 'Not Connected'}
        {' '}
-
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
            if (data.hello === 'Hello World') {
              return 'Graphql Server Connected';
            }
            return null;
          }}
        </Query>
        <div className="Body">
          <Route path="/" exact component={Entry} />
          <Route path="/secondary/" component={Secondary} />
          <Route
            path="/login/"
            render={() => (
              <Login logInFunction={this.logInFunction} />
            )}
          />
          <Route
            path="/account/"
            // component={AccountScreen} />
            render={() => (
              <AccountScreen
                name={name}
                progress={progress}
                email={email}
                logOutFunction={this.logOutFunction}
                deleteAccountFunction={this.deleteAccountFunction}
                resetProgressFunction={this.resetProgressFunction}
                updateDetailsFunction={this.updateDetailsFunction}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
};

App.propTypes = {
  client: PropTypes.shape().isRequired,
};

export default withStyles(styles)(App);
