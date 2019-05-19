import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ShowsGridList from './ShowsGridList';
import './ShowsIndex.css'

class ShowsIndex extends Component {

    render() {
        const { classes, location} = this.props;
        return (
            <Grid
                container
                className={classes.container}
                direction="column"
                justify="flex-start"
                alignItems="center"
                wrap="nowrap"
            >
                <Grid item md={1} className={classes.headerContainer}>
                    <div className={classes.headerInnerContainer}>
                        <div><h3 style={{ color: "#2B1935", fontFamily: "Sharp Sans No1 Bold"}}>Shows Tonight in {`${location}`}...</h3></div>
                        <div><p style={{ color: "#2B1935", fontFamily: "Sharp Sans No1 Semibold"}}>Check different night</p></div>
                    </div>
                    <hr className="divider"/>
                </Grid>
                
                <Grid item md={11} className={classes.listContainer}>
                    <ShowsGridList />
                </Grid>
            </Grid>
        );
    }
}


const styles = (theme) => ({
    container: {
        maxHeight: '100%',
        minHeight: '100%',
        width: '100%',
    },
    showsList: {
        minWidth: '100%',
    },
    headerContainer: {
        minWidth: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '25px',
        paddingRight: '25px',
    },
    headerInnerContainer: {
        minWidth: '100%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '25px',
        paddingRight: '25px',
    },
    listContainer: {
        minWidth: '100%',
        paddingLeft: '25px',
        paddingRight: '25px',
        overflow: 'auto'
    }
});


export default withStyles(styles)(ShowsIndex);


