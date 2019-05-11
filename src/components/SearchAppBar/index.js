import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import LocationSearchInput from './LocationSearchInput.js';

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
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
});


class SearchAppBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Live Tonight!
            </Typography>
            <div className={classes.grow} />
            <LocationSearchInput />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(SearchAppBar);