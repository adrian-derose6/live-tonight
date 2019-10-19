// React and Redux Packages
import React from 'react';
import { connect } from 'react-redux';

// react-places-autocomplete
import PlacesAutocomplete from 'react-places-autocomplete';

// Material-UI Packages
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';

// Redux Actions
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
    this.setState({ address });
    
    this.props.setSearchLocation({ address: address })
  }

  render() {
    const { classes } = this.props;
    const inputProps = {
      placeholder: 'Change Location...',
      classes: {
        root: classes.inputRoot,
        input: classes.inputInput,
      },
      styles: {
        color: "#2B1935"
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
              <InputBase
                {...getInputProps(inputProps)}
              />
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
            </div>
            <Paper style={{ maxHeight: 300 }} square className={classes.suggestionsContainerOpen}>
              <div className={classes.suggestionsList}>
                {suggestions.map(suggestion =>
                  <MenuItem { ...getSuggestionItemProps(suggestion, { className: classes.suggestion})} >
                    { suggestion.active ? (
                        <span style={{ fontFamily: "Sharp Sans No1 Semibold" }}>
                          {suggestion.description}
                        </span>
                      ) : (
                        <strong style={{ fontFamily: "Sharp Sans No1 Medium" }}>
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

// Custom Material-UI Styles 
const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: 0,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: '100%',
    },
    display: 'flex',
    border:'2px #2B1935 solid',
    color: "#2B1935",
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
    color: "#2B1935"
  },
  inputRoot: {
    width: '100%',
    color: "#2B1935",
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
    fontFamily: "Sharp Sans No1 Semibold",
    color: "#2B1935"
  },
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 2010,
    marginTop: theme.spacing.unit,
    left: 30,
    width: 400
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    color: "#2B1935",
  },
  suggestion: {
    borderBottom: '1px solid lightgray',
    
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
})

const mapDispatchToProps = dispatch => {
  return {
    setSearchLocation: (geocoderRequest) => dispatch(setSearchLocation(geocoderRequest))
  }
}

const mapStateToProps = state => {
  return {
    searchLocation: state.location.searchLocation
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LocationSearchInput));