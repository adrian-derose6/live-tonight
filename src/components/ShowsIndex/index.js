import React from 'react';

import { Grid, List, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const ShowsIndex = ({ classes }) => {
    return (
        <Grid
            container
            className={classes.container}
            direction="column"
            justify="flex-start"
            alignItems="center"
        >
            <Grid item md={2} className={classes.headerContainer}>
                <div><h3>Shows Tonight...</h3></div>
                <div><p>Check different night</p></div>
            </Grid>
            <Divider variant="middle"/>
            <Grid item md={10} className={classes.listContainer}>
                
            </Grid>
        </Grid>
    );
}


const styles = theme => ({
    container: {
        height: '100%',
        minWidth: '100%',
        border: '1px solid purple',
    },
    showsList: {
        minWidth: '100%',
    },
    headerContainer: {
        minWidth: "100%",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '15px',
        paddingRight: '15px'
    },
    listContainer: {

    }
});

export default withStyles(styles)(ShowsIndex);


