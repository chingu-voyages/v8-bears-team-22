import React, { Component } from 'react'
import {FormLabel, Paper, TextField} from '@material-ui/core';
import '../css/account.css';


class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "johndoe@gmail.com",
      password: "password",
      name: "John Doe",
      isLoggedIn: false
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div className="account">
        <FormLabel className="account-form-label">PERSONAL</FormLabel>
        <Paper className="account-paper">
          <form className="account-form">
            <TextField
              id="standard-uncontrolled"
              label="Name"
              className="text-field"
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              id="standard-uncontrolled"
              label="Email"
              className="text-field"
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
            />
          </form>
        </Paper>
      </div>
    )
  }

}


export default AccountScreen;