// React Packages 
import React, { Component } from "react";

// Material UI Packages
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MusicNoteOutlined from '@material-ui/icons/MusicNoteOutlined';


// Material UI Custom Styles 
const styles = theme => ({
    root: {
        width: '100%'
    },
    appBar: {
        boxShadow: 'none',
        backgroundColor: "#2B1935",
        height: '79px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        fontFamily: "Sharp Sans No1 Bold",
        justifyContent: 'center',
        alignItems: 'center',
        alignText: 'center',
        fontSize: 30
    }
});


class TopAppBar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar>
                        <MusicNoteOutlined style={{ fontSize: '3em' }} />
                        <h2 className={classes.title}>Live Tonight</h2>
                        <div className={classes.grow} />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(TopAppBar);