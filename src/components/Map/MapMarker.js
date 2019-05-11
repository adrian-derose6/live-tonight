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
        top: -35 / 2,
    },
    marker: {
        fill: "#2B1935",
        '&:hover': {
            fill: "#685065",
            cursor: 'pointer'
        }
    }
})
  
function MapMarker({ classes, onClick, $hover }) {
    
    return (
        <div className={classes.markerContainer}>
            <Marker onClick={onClick} className={classes.marker} width={30} height={30} /> 
        </div>
    )
}
  
export default withStyles(styles)(MapMarker);