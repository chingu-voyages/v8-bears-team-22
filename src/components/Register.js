import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FormControl, Input, InputLabel, Paper,
} from '@material-ui/core';
import './Login.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
      open: false,
      modalMessage: '',
      redirect: false,
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

  onRegisterClick = () => {
    const { email, password, name } = this.state;

    const payload = {
      email,
      name,
      password,
    };

    fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(res => res.json())
      .then((response) => {
        if (response.result.error) {
          this.setState({
            modalMessage: response.result.error,
          });
        }
        if (response.result.message) {
          this.setState({
            open: true,
            modalMessage: response.result.message,
            redirect: true,
          });
        } else if (!response.result.validPassword) {
          this.setState({
            open: true,
          });
        } else {
        //   logInFunction(
        //     response.result.email,
        //     response.result.name,
        //     response.result.progress,
        //   );
          this.setState({
            open: true,
          });
        }
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  };

  handleClose = () => {
    const { redirect } = this.state;
    const { history } = this.props;

    if (redirect) {
      this.setState({
        open: false,
        modalMessage: '',
        redirect: false,
      }, () => history.push('/login'));
    }
    this.setState({ open: false, modalMessage: '' });
  };

  validateForm() {
    const { email, password, passwordConfirmation } = this.state;
    return email.length > 0 && password.length > 0 && password === passwordConfirmation;
  }

  render() {
    const {
      open, modalMessage,
    } = this.state;

    return (
      <div className="login">
        <Paper className="paper">
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {modalMessage}
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <form onSubmit={this.onFormSubmit} className="login-form">
            <FormControl fullWidth>
              <InputLabel>Email*</InputLabel>
              <Input autoFocus required id="email" name="email" type="email" onChange={this.onInputChange} />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Name</InputLabel>
              <Input id="name" name="name" type="text" onChange={this.onInputChange} />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Password*</InputLabel>
              <Input required id="password" name="password" type="password" onChange={this.onInputChange} />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Password Confirmation*</InputLabel>
              <Input required id="passwordConfirmation" name="passwordConfirmation" type="password" onChange={this.onInputChange} />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              disabled={!this.validateForm()}
              onClick={this.onRegisterClick}
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

Register.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};
