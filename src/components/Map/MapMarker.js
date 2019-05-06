import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as Marker } from './map-marker.svg';

const styles = theme => ({
    markerContainer: {
        position: 'absolute',
        width: 35,
        height: 35,
        left: -35 / 2,
        top: -35 / 2
    }
})
  
function MapMarker(props) {
    const { classes } = props;
    const style = props.$hover ? {fill: 'blue'} : { fill: '#3f51b5'}
    return (
        <div className={classes.markerContainer}>
            <Marker style={style} width={30} height={30} />
        </div>
    )
}
  
export default withStyles(styles)(MapMarker);