import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const MarkerComponent = ({ text }) => <div>{text}</div>;

class ShowsMap extends Component {
  static defaultProps = {
    center: {
      lat: 41.8781,
      lng: -87.6298
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC-mITYSots24MEoNzoPew533UKmVOga8Y' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <MarkerComponent
            lat={41.8781}
            lng={87.6298}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}



export default ShowsMap;
