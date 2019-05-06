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
    boxShadow: '0px 1px 2px -1px rgba(135,119,135,1)',
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
    fontFamily: "Sharp Sans No1 Semibold",
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