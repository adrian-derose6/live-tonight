import React from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { setSearchLocation } from '../../actions/location.js';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  }

  handleSelect = address => {
    this.setState({address});
    geocodeByAddress(address)
      .then(results => {
        console.log(results)
        return {
          name: results[0].formatted_address,
          center: {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          },
          viewport: {
            ne: {
              lat: results[0].geometry.viewport.getNorthEast().lat(),
              lng: results[0].geometry.viewport.getNorthEast().lng()
            },
            sw: {
              lat: results[0].geometry.viewport.getSouthWest().lat(),
              lng: results[0].geometry.viewport.getSouthWest().lng()
            }
          }
        }
      })
      .then(locationInfo => this.props.setSearchLocation(locationInfo))
      .catch(error => console.error('Error', error));
  }

  render() {
    const { classes } = this.props;
    const inputProps = {
      placeholder: 'Change location...',
      classes: {
        root: classes.inputRoot,
        input: classes.inputInput,
      }
    };

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                {...getInputProps(inputProps)}
              />
            </div>
            <Paper style={{maxHeight: 300, overflow: 'auto' }} square className={classes.suggestionsContainerOpen}>
              <div className={classes.suggestionsList}>
                {suggestions.map(suggestion =>
                  <MenuItem { ...getSuggestionItemProps(suggestion, { className: classes.suggestion})} >
                    { suggestion.active ? (
                        <span style={{ fontFamily: "Sharp Sans No1 Semibold" }}>
                          {suggestion.description}
                        </span>
                      ) : (
                        <strong style={{ fontFamily: "Sharp Sans No1 Book" }}>
                          {suggestion.description}
                        </strong>
                      )
                    }
                  </MenuItem>
                )}
              </div>
            </Paper>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: 0,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: '100%',
    },
    display: 'flex',
  },
  searchIcon: {
    width: theme.spacing.unit * 1,
    height: '100%',
    position: 'absolute',
    paddingLeft: '20px',
    paddingRight: '10px',
    pointerEvents: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 300,
      },
    },
    fontSize: '14px',
    fontFamily: "Sharp Sans No1 Book"
  },
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 2010,
    marginTop: theme.spacing.unit,
    right: 15,
    width: 400
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    color: "#2B1935"
  },
  suggestion: {
    borderBottom: '1px solid lightgray'
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
})

const mapDispatchToProps = dispatch => {
  return {
    setSearchLocation: (location) => dispatch(setSearchLocation(location))
  }
}

const mapStateToProps = state => {
  return {
    searchLocation: state.location.searchLocation
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LocationSearchInput));