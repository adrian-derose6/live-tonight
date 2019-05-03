import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import { setCurrentLocation } from '../../actions/location.js';

const MarkerComponent = ({ text }) => <div>{text}</div>;

class ShowsMap extends Component {
  static defaultProps = {
    center: {
      lat: 41.8781,
      lng: -87.6298
    },
    zoom: 13
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC-mITYSots24MEoNzoPew533UKmVOga8Y' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={this.props.currentLocation}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentLocation: state.location.currentLocation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentLocation: (location) => dispatch(setCurrentLocation(location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowsMap);
