import React from 'react';

import { Grid, List, Divider, GridList } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ShowsGridList from './ShowsGridList';
import './ShowsIndex.css'

const ShowsIndex = ({ classes }) => {
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
                    <div><h3 style={{ fontFamily: "Sharp Sans No1 Semibold"}}>Shows Tonight in Chicago...</h3></div>
                    <div><p style={{ fontFamily: "Sharp Sans No1 Medium"}}>Check different night</p></div>
                </div>
                <hr className="divider"/>
            </Grid>
            
            <Grid item md={11} className={classes.listContainer}>
                <ShowsGridList />
            </Grid>
        </Grid>
    );
}


const styles = theme => ({
    container: {
        height: '100%',
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
        flexDirection: 'column',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '25px',
        paddingRight: '25px',
    },
    listContainer: {
        minWidth: '100%',
        paddingLeft: '25px',
        paddingRight: '25px'
    }
});

export default withStyles(styles)(ShowsIndex);


