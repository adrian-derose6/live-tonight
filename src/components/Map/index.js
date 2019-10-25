// React & Redux Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';

// 'google-maps-react' Packages
import { Map, GoogleApiWrapper, Marker, InfoWindow, Polygon } from 'google-maps-react';


const mapStyles = {
	width: '100%', 
	height: '100%', 
	position: 'relative'
}

class SearchMap extends Component {
	constructor(props) {
		super(props);
		const { lat, lng } = this.props.center;
		const bounds = this.props.bounds;
		this.state = {
			showingInfoWindow: false, 
			activeMarker: {},          
			selectedPlace: {},
			currentLocation: {
				lat: lng,
				lng: lng
			},
			bounds: bounds,
			polygonCoords: []
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.center !== this.state.currentLocation) {
			this.setState({
				currentLocation: this.props.center
			});
		}

		if (prevProps.bounds !== this.props.bounds) {
			this.setState({
				bounds: this.props.bounds
			});
		}

		if (prevProps.polygonCoords !== this.state.polygonCoords) {
			this.setState({ polygonCoords: this.props.polygonCoords })
		}
	}

	onMarkerClick = (props, marker, e) =>
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});

	onClose = props => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};

	calculateBounds = () => {
		const { bounds } = this.state;
		let latLngBounds = new this.props.google.maps.LatLngBounds();

		for (var i = 0; i < bounds.length; i++) {
			latLngBounds.extend(bounds[i])
		}

		return latLngBounds;
	}

	render() {
		let newBounds = this.calculateBounds();
		return (
			<Map
				google={this.props.google}
				center={this.state.currentLocation}
				style={mapStyles}
				initialCenter={this.props.center}
				fullscreenControl={false}
				streetViewControl={false}
				bounds={newBounds}
				zoom={14}
			> 
				<Polygon
					paths={this.props.polygonCoords}
					strokeColor='#2B1935'
					fillColor="#2B1935"
					fillOpacity={0}
				/>
				<Marker
					onClick={this.onMarkerClick}
					name={'Schaumburg'}
					position={this.props.center} 
				/>
				<InfoWindow
					marker={this.state.activeMarker}
					visible={this.state.showingInfoWindow}
					onClose={this.onClose} 
				>
					<div>
						<h4>{this.state.selectedPlace.name}</h4>
					</div>
				</InfoWindow>
			</Map>
		);
	}
}

export default GoogleApiWrapper({
  	apiKey: 'AIzaSyC-mITYSots24MEoNzoPew533UKmVOga8Y'
})(SearchMap);
