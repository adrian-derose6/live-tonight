import React from 'react';
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
    maxHeight: '100%',
    maxWidth: '100%',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
    paddingLeft: 8,
    paddingTop: 7
  },
  gridList: {
    width: '100%',
    height: '100%',
    overflow: 'visible'
  },
  tile: {
    '&:hover': {
      cursor: 'pointer'
    },
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

function ShowsGridList({ classes, showsList }) {
	return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cellHeight={220} spacing={6}>
        {tileData.map(tile => {
          return (
            <GridListTile className={classes.tile} key={tile.artist}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.artist}
                subtitle={<span>{tile.venue}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${tile.artist}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          )
        })}
      </GridList>
    </div>
  );
}

ShowsGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowsGridList);