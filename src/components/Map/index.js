import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { geolocated } from 'react-geolocated';
import { setCurrentLocation } from '../../actions/location.js';

const MarkerComponent = ({ text }) => <div>{text}</div>;

class ShowsMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceLocation: {}
    }
  }

  static defaultProps = {
    zoom: 13,
    center: {
      lat: 41.8781,
      lng: -87.6298
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.coords !== this.props.coords) {
      this.props.setCurrentLocation({
        lat: this.props.coords.latitude,
        lng: this.props.coords.longitude
      })
    }
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

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  geolocated({
    positionOptions: {
      enableHighAccuracy: true
    },
    geolocationProvider: navigator.geolocation
  })
(ShowsMap));
