import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: '100%',
    maxWidth: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    maxWidth: '100%',
    minWidth: '100%',
    height: '100%',
  },
  tile: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  img: {
    transition: 'all .2s ease-in-out',
    '&:hover': {
      opacity: 0.9,
    }
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const tileData = [
    {
      img: 'https://dk2600.files.wordpress.com/2016/12/mass-appeal-nas-it-aint-hard-to-tell.jpg?w=1000',
      artist: 'Nas',
      venue: 'House of Blues'
    },
    {
      img: 'http://wallsdesk.com/wp-content/uploads/2016/08/Kendrick-Lamar-HD-Desktop.jpg',
      artist: 'Kendrick Lamar',
      venue: 'Venue'
    },
    {
      img: 'https://s9.postimg.cc/lic9q828v/travisscott.jpg',
      artist: 'Travis Scott',
      venue: 'Venue'
    },
    {
      img: 'https://i.scdn.co/image/58d9ba5012103acbc841734c01fd1d58be3eab12',
      artist: 'Pete Rock & C.L. Smooth',
      venue: 'Venue'
    }
]

function ShowsGridList({ classes, searchShows }) {
  return (
    <div className={classes.root}>
      <GridList cellHeight={240} className={classes.gridList}>
          { searchShows.map((tile, index) => (
            <GridListTile className={classes.tile} key={index}>
              <img src={tile.artistImg} alt={tile.artistName} className={classes.img} />
              <GridListTileBar
                title={<span style={{ fontFamily: "Sharp Sans No1 Semibold"}}>{tile.artistName || tile.eventName}</span>}
                subtitle={<span style={{ fontFamily: "Sharp Sans No1 Medium"}}>{tile.venue}</span>}
              />
            </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

ShowsGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    searchShows: state.shows.searchShows,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ShowsGridList));