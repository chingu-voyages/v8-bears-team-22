import React from 'react';
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


const Sidebar = props => (
  <Drawer
    variant="persistent"
    anchor="left"
    open={props.open}
  >
    <div>
      <IconButton onClick={props.handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <Typography variant="h4" gutterBottom>
      {props.name}
    </Typography>
    <div>
      <CircularProgressBar
        percentage={props.progress}
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
      <ListItem button key="Curriculum">
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

export default Sidebar;
