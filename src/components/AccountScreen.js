import React, { Component } from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, FormLabel, Paper, TextField} from '@material-ui/core';
import '../css/account.css';

// TODO:* Validate PERSONAL form inputs
//        fileds not empty
//
//      * Validate PERSONAL form submit
//        email is valid email
//        old password matches
//
//      * Update user info in DB
//
//      * ACCOUNT SETTINGS form:
//        * Display progress
//        * Reset progress button
//        * Logout
//        * Delete account
//
//      * Refactor:
//        * Reusable Dialog Component
//        * Reusable Form Validators
//        * Reusable form that accepts field names


const PASSWORD = "password"
class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "johndoe@gmail.com",
      oldPassword: "",
      newPassword: "",
      name: "John Doe",
      open: false
    }
  }

  get isInputValid() {
    const {name, email, oldPassword, newPassword } = this.state
    return name.length > 0 && email.length > 0 && oldPassword.length > 0 && newPassword.length > 0
  }

  get isPasswordMatch() {
    return PASSWORD === this.state.oldPassword;
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  submitForm = (event) => {
    event.preventDefault();
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div className="account">

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.isPasswordMatch ? "Information updated successfully" : "Old password doesn't match"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <FormLabel className="account-form-label">Update Personal Information</FormLabel>
        <Paper className="account-paper">
          <form 
            className="account-form"
            onSubmit={this.submitForm}
          >
            <TextField
              id="standard-name"
              label="Name"
              className="text-field"
              value={this.state.name}
              required
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Email"
              type="email"
              className="text-field"
              value={this.state.email}
              required
              onChange={this.handleChange('email')}
              margin="normal"
            />
            <TextField
              id="standard-email-input"
              label="Old password"
              className="text-field"
              type="password"
              required
              value={this.state.oldPassword}
              onChange={this.handleChange('oldPassword')}
              margin="normal"
            />
            <TextField
              id="standard-password-input"
              label="New password"
              className="text-field"
              type="password"
              value={this.state.newPassword}
              required
              onChange={this.handleChange('newPassword')}
              margin="normal"
            />
            <Button 
              type="standard-password-input"
              variant="contained" 
              color="primary"
              disabled={this.isFormValid}
            >
              Update
            </Button>
          </form>
        </Paper>
      </div>
    )
  }
}

export default AccountScreen;