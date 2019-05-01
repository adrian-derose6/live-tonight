import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import ShowsIndex from '../ShowsIndex/index.js';
import './styles.css';

class MapDashboard extends Component {
    render() {
        const { windowWidth, windowHeight } = this.props;
        const { classes } = this.props;
        return (
            <div className={classes.root} style={{ height: windowHeight - 65 }}>
                <Grid
                    container
                    zeroMinWidth
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    className={classes.grid}
                >
                    <Grid item md={5} className={classes.leftPanel}>
                        <Grid
                            container
                            zeroMinWidth
                            direction="column"
                            justify='flex-start'
                            className={classes.leftGrid}
                        >
                            <Grid item md={7} className={classes.mapContainer}>
                                
                            </Grid>

                            <Grid item md={5} className={classes.playlistContainer}>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={7} className={classes.rightPanel}>
                        <ShowsIndex />    
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
       flexGrow: 1,
    },
    grid: {
        height: '100%',
        width: '100%',
    },
    leftPanel: {
       height: '100%'
    },
    rightPanel: {
        height: '100%',
        borderLeft: '1px solid gray'
    },
    leftGrid: {
        height: '100%',
        minWidth: '100%'
    },
    mapContainer: {
        width: '100%'
    },
    playlistContainer: {
        minWidth: '100%',
        height: '100%',
        border: '1px solid green'          
    }
});

export default withStyles(styles)(MapDashboard);
