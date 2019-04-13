import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Paper,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CachedIcon from '@material-ui/icons/Cached';
import './AccountScreen.css';

const PASSWORD = 'password'; // hardcoded password for testing the form

const styles = {
  button: {
    margin: 5,
  },
};

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      email: props.email,
      newPassword: '',
      dialogMessage: '',
      open: false,
    };
  }

  get isPasswordMatch() {
    const { oldPassword } = this.state;
    return PASSWORD === oldPassword;
  }

  get dialogMessage() {
    const { dialogMessage } = this.state;
    // const {
    //   newPassword, oldPassword, name, email,
    // } = this.state;
    // if (newPassword.length > 0) {
    //   return oldPassword.length > 0 && this.isPasswordMatch
    //     ? 'Password updated successfully!'
    //     : "Old password doesn't match!";
    // }
    // return `Updated successfully! Name: ${name}. Email: ${email}`;
    return dialogMessage;
  }

  deleteAccountFunction = async () => {
    const { email } = this.state;
    const { deleteAccountFunction } = this.props;
    const returnMessage = await deleteAccountFunction(email);
    this.setState({ dialogMessage: returnMessage, open: true });
  }

  resetProgressFunction = async () => {
    const { email } = this.state;
    const { resetProgressFunction } = this.props;
    const returnMessage = await resetProgressFunction(email);
    this.setState({ dialogMessage: returnMessage, open: true });
  }

  submitForm = async (event) => {
    const { updateDetailsFunction } = this.props;
    event.preventDefault();
    // update info in user table
    // ...
    const { name, email, newPassword } = this.state;
    const returnMessage = await updateDetailsFunction(name, email, newPassword);
    this.setState({ dialogMessage: returnMessage, open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const {
      email, name, newPassword, open,
    } = this.state;
    const { classes } = this.props;

    return (
      <div className="account">
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <h2 className="account-form-label">Update Personal Information</h2>
        <Paper className="account-paper">
          <form className="account-form" onSubmit={this.submitForm}>
            <TextField
              id="standard-name"
              label="Name"
              className="text-field"
              value={name}
              required
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              id="standard-email"
              label="Email"
              type="email"
              className="text-field"
              value={email}
              required
              onChange={this.handleChange('email')}
              margin="normal"
            />
            {/* <TextField
              id="standard-email-input"
              label="Old password"
              className="text-field"
              type="password"
              value={oldPassword}
              onChange={this.handleChange('oldPassword')}
              margin="normal"
            /> */}
            <TextField
              id="standard-password-input"
              label="New password"
              className="text-field"
              type="password"
              value={newPassword}
              onChange={this.handleChange('newPassword')}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </form>
        </Paper>

        <h2 className="account-form-label">Account Settings</h2>
        <Paper className="account-paper">
          <Button
            onClick={this.resetProgressFunction}
            type="standard-password-input"
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            <CachedIcon />
            Reset Progress
          </Button>
          <Button
            onClick={this.deleteAccountFunction}
            type="standard-password-input"
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            <DeleteIcon />
            Delete Account
          </Button>
        </Paper>
      </div>
    );
  }
}

AccountScreen.propTypes = {
  classes: PropTypes.shape().isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  updateDetailsFunction: PropTypes.func.isRequired,
  deleteAccountFunction: PropTypes.func.isRequired,
  resetProgressFunction: PropTypes.func.isRequired,
};

AccountScreen.defaultProps = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
};

export default withStyles(styles)(AccountScreen);
