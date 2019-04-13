import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from '../components/Sidebar';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   open: false,
    };
  }


  render() {
    const { handleDrawerOpen } = this.props;

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton color="default" aria-label="Menu" onClick={handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Interview Preppers
            </Typography>
            <Button>
              <Link to="/login">Login</Link>
            </Button>
          </Toolbar>
        </AppBar>

        <Sidebar
          {...this.props}
        />
      </div>
    );
  }
}

Header.propTypes = {
  handleDrawerOpen: PropTypes.func.isRequired,
};
