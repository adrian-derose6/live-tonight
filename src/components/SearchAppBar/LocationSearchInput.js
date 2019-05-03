import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Autosuggest from 'react-autosuggest';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize, fade } from '@material-ui/core/styles/colorManipulator';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { FormHelperText } from '@material-ui/core';

import './LocationSearchInput.css'

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
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
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
    color: 'black'
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
})

export default withStyles(styles)(LocationSearchInput);