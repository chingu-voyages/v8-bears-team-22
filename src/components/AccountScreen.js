import React, { Component } from 'react'
// import {Button, FormControl, Input, InputLabel, Paper} from "@material-ui/core"


class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false
    }
  }


  render() {
    return (
      <div className="account">
        <form className="account-personal">
          Account Screen
        </form>
      </div>
    )
  }

}


export default AccountScreen;