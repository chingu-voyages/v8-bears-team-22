import React, {Component} from "react";
import {Link} from "react-router-dom";
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Mail from '@material-ui/icons/Mail';
import Inbox from '@material-ui/icons/Inbox';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Drawer from "@material-ui/core/Drawer";


export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  handleDrawerOpen() {
    this.setState({open: true});
  }

  handleDrawerClose() {
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton color="default" aria-label="Menu" onClick={this.handleDrawerOpen}>
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit">
              Interview Preppers
            </Typography>
            <Button>
              <Link to="/login">Login</Link>
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="persistent"
          anchor="left"
          open={this.state.open}
        >
          <div>
            <IconButton onClick={this.handleDrawerClose}> <ChevronLeft/> : <ChevronRight/>}
            </IconButton>
          </div>
          <Divider/>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <Mail/> : <Mail/>}</ListItemIcon>
                <ListItemText primary={text}/>
              </ListItem>
            ))}
          </List>
          <Divider/>
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <Inbox/> : <Mail/>}</ListItemIcon>
                <ListItemText primary={text}/>
              </ListItem>
            ))}
          </List>
        </Drawer>


      </div>

    );
  }

};
