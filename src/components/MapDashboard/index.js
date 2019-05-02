import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import ShowsIndex from '../ShowsIndex/index.js';
import './styles.css';

import { fetchShowsByCriteria } from '../../actions/shows.js';

class MapDashboard extends Component {
    componentDidMount() {
        this.props.fetchShowsByCriteria();
    }

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
       height: '100%',
    },
    rightPanel: {
        height: '100%',
        boxShadow: '-1px 0px 2px -1px rgba(135,119,135,1)',
        zIndex: 2000
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
    }
});

const mapStateToProps = (state) => {
    return {
      shows: state.shows
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchShowsByCriteria: (criteria) => dispatch(fetchShowsByCriteria(criteria))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MapDashboard));

