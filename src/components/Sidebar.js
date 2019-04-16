import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InfoIcon from '@material-ui/icons/Info';
import SchoolIcon from '@material-ui/icons/School';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CircularProgressBar from './CircularProgressBar';

const Sidebar = ({
  open, handleDrawerClose, name, progress,
}) => (
  <Drawer variant="persistent" anchor="left" open={open}>
    <div>
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <Typography variant="h4" gutterBottom>
      {name}
    </Typography>
    <div>
      <CircularProgressBar
        percentage={progress}
      />
    </div>
    <Divider />
    <List>
      <ListItem button key="Overview">
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Overview" />
      </ListItem>
      <Divider />
      <ListItem button key="Curriculum" component={Link} to="/curriculum">
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Curriculum" />
      </ListItem>
      <Divider />
      <ListItem button key="Account" component={Link} to="/account">
        <ListItemIcon>
          <AccountIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
      <Divider />
    </List>
  </Drawer>
);


Sidebar.defaultProps = {
  name: 'Sidebar',
  open: false,
  progress: 0,
};

Sidebar.propTypes = {
  name: PropTypes.string,
  progress: PropTypes.number,
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func.isRequired,
};

export default Sidebar;
