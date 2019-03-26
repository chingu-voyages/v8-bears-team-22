import React, {Component} from 'react'
import {FormControl, Input, InputLabel, Paper, Button} from "@material-ui/core";

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <div>
        <Paper>
          <form>
            <FormControl fullWidth>
              <InputLabel>Email</InputLabel>
              <Input id="email" name="email"/>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Password</InputLabel>
              <Input id="password" name="password" type="password"/>
            </FormControl>
            <Button type="submit" fullWidth color="primary">Login</Button>
          </form>
        </Paper>
      </div>
    )
  }

}
