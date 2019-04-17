import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      invalidEmail: false,
      invalidPassword: false,
      open: false,
    };
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
    const { email, password } = this.state;
    const { logInFunction } = this.props;

    const payload = {
      email,
      password,
    };

    AccountService.login(payload)
      .then((response) => {
        if (!response.result.validEmail) {
          this.setState({
            invalidEmail: true,
            invalidPassword: false,
            isLoggedIn: false,
            open: true,
          });
        } else if (!response.result.validPassword) {
          this.setState({
            invalidEmail: false,
            invalidPassword: true,
            isLoggedIn: false,
            open: true,
          });
        } else {
          logInFunction(
            response.result.email,
            response.result.name,
            response.result.progress,
          );
          this.setState({
            invalidEmail: false,
            invalidPassword: false,
            isLoggedIn: true,
            open: true,
          }, () => {
            AccountService.setAuthToken(response.result.token);
          });
        }
      });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  validateForm() {
    const { email, password } = this.state;
    return email.length > 0 && password.length > 0;
  }

  render() {
    const {
      open, isLoggedIn, invalidEmail, invalidPassword,
    } = this.state;

    return (
      <div className="login">
        <div> valid email/password : test@email.com/password</div>
        <Paper className="paper">
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {isLoggedIn ? 'Login Successful' : ''}
                {invalidEmail ? 'Invalid Email' : ''}
                {invalidPassword ? 'Incorrect Password' : ''}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <form onSubmit={this.onFormSubmit} className="login-form">
            <FormControl fullWidth>
              <InputLabel>Email</InputLabel>
              <Input id="email" name="email" type="email" onChange={this.onInputChange} />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Password</InputLabel>
              <Input id="password" name="password" type="password" onChange={this.onInputChange} />
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

Login.propTypes = {
  logInFunction: PropTypes.func.isRequired,
};
