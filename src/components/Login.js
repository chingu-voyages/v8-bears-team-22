import React, { Component } from 'react';
import {
  Button, FormControl, Input, InputLabel, Paper,
} from '@material-ui/core';
import './Login.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AccountService from '../services/AccountService';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      open: false,
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  onFormSubmit = (event) => {
    event.preventDefault();
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onLoginClick = () => {
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };

    AccountService.login(payload)
      .then((response) => {
        this.setState({ isLoggedIn: response.result, open: true });
      });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="login">
        <div> valid email/password : test@email.com/password</div>
        <Paper className="paper">
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Login
                {' '}
                {this.state.isLoggedIn ? 'Successful' : 'Unsuccessful'}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <form
            onSubmit={this.onFormSubmit}
            className="login-form"
          >
            <FormControl fullWidth>
              <InputLabel>Email</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={this.onInputChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Password</InputLabel>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={this.onInputChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              disabled={!this.validateForm()}
              onClick={this.onLoginClick}
              color="primary"
            >
Login
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}
