import React, {Component} from 'react'
import {FormControl, Input, InputLabel, Paper, Button} from "@material-ui/core";
import '../css/login.css';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  onFormSubmit = event => {
    event.preventDefault();
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  onLoginClick = () => {
    // TODO add submit to server endpoint
    console.log(this.state);
  };

  render() {
    return (
      <div className="login">
        <Paper className="paper">
          <form onSubmit={this.onFormSubmit}
                className="login-form">
            <FormControl fullWidth>
              <InputLabel>Email</InputLabel>
              <Input id="email"
                     name="email"
                     type="email"
                     onChange={this.onInputChange}/>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Password</InputLabel>
              <Input id="password"
                     name="password"
                     type="password"
                     onChange={this.onInputChange}/>
            </FormControl>
            <Button type="submit"
                    fullWidth
                    disabled={!this.validateForm()}
                    onClick={this.onLoginClick}
                    color="primary">Login</Button>
          </form>
        </Paper>
      </div>
    )
  }

}
