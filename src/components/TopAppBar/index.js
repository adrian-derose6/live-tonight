// React Packages 
import React, { Component } from "react";

// Material UI Packages
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

// Child Components
import LocationSearchInput from './LocationSearchInput.js';

// Material UI Styles 
const styles = theme => ({
  root: {
    width: '100%',
  },
  appBar: {
    boxShadow: 'none',
    backgroundColor: "#2B1935"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    fontFamily: "Sharp Sans No1 Bold",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
});


class TopAppBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h5" color="inherit" noWrap>
            Live Tonight!
            </Typography>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(TopAppBar);