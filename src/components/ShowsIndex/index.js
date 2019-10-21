import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ShowsGridList from './ShowsGridList';
import './ShowsIndex.css'

class ShowsIndex extends Component {
    renderLocation = (location) => {
        return (location === '') ? 'near you' : `near ${location}`
    }

    render() {
        const { classes, location, searchShows } = this.props;

        return (
            <Grid
                container
                className={classes.container}
                direction="column"
                wrap="nowrap"
            >
                <Grid item className={classes.headerContainer}>
                    <div className={classes.headerInnerContainer}>
                        <div><h3 style={{ color: "#2B1935", fontFamily: "Sharp Sans No1 Semibold"}}>Shows Tonight Near {`${(location === '') ? 'You': location}`}...</h3></div>
                        <div>
                            <p style={{ fontSize: 15, color: "#2B1935", fontFamily: "Sharp Sans No1 Semibold"}}>Sort By:</p>
                        </div>
                    </div>
                    
                </Grid>
                <Grid item className={classes.listContainer}>
                    <div className={classes.gridList}>

                    </div>
                </Grid>
            </Grid>
        );
    }
}


const styles = (theme) => ({
    container: {
        height: '100%'
    },
    headerContainer: {
        minWidth: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderBottom: '1px lightgray solid'
    },
    headerInnerContainer: {
        minWidth: '100%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listContainer: {
        display: 'flex',
        width: '100%',
        height: 500,
    },
    gridList: {
        height: '100%'
    }
});

const mapStateToProps = (state) => {
    return {
      searchShows: state.shows.searchShows,
      searchLocation: state.location.searchLocation
    }
}


export default connect(mapStateToProps)(withStyles(styles)(ShowsIndex));


