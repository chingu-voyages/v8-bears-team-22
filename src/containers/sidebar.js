import React from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InfoIcon from "@material-ui/icons/Info";
import SchoolIcon from "@material-ui/icons/School";
import AccountIcon from "@material-ui/icons/AccountCircle";
import CircularProgressBar from "../components/CircularProgressBar";
import {Typography} from "@material-ui/core";


const Sidebar = (props) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={props.open}>
      <div>
        <IconButton onClick={props.handleDrawerClose}>
          <ChevronLeftIcon/>
        </IconButton>
      </div>
      <Divider/>
      <Typography variant="h4" gutterBottom>
        John Doe
      </Typography>
      <div>
        <CircularProgressBar/>
      </div>
      <Divider/>
      <List>
        <ListItem button key="Overview">
          <ListItemIcon>
            <InfoIcon/>
          </ListItemIcon>
          <ListItemText primary="Overview"/>
        </ListItem>
        <ListItem button key="Curriculum">
          <ListItemIcon>
            <SchoolIcon/>
          </ListItemIcon>
          <ListItemText primary="Curriculum"/>
        </ListItem>
        <ListItem button key="Account">
          <ListItemIcon>
            <AccountIcon/>
          </ListItemIcon>
          <ListItemText primary="Account"/>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
