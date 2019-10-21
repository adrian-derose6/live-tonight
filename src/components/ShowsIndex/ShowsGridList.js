import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  root: {
    width: '100%',
    margin: '0 auto',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5
  },
  gridRow: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    height: '100%'
  },
  gridItem: {
    flexBasis: '50%',
    height: '50%',
    width: 259,
    position: 'relative',
    boxSizing: 'border-box',
    padding: 4
  },
  gridList: {
    minHeight: '100%',
    minWidth: '100%'
  },
  tileCard: {
    '&:hover': {
      cursor: 'pointer'
    },
    width: '100%',
    height: '100%',
    borderRadius: 0,
    boxShadow:'0px 0px 5px -2px rgba(140,138,140,1)'
  },
  img: {
    transition: 'all .2s ease-in-out',
    '&:hover': {
      opacity: 0.9,
    },
    minHeight: '100%',
    minWidth: '100%',
    top: '50%',
    left: '50%',
    objectFit: 'cover'
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
    },
]

function ShowsGridList({ classes, showsList }) {
	return (
    <div className={classes.root}>
      <div className={classes.gridRow}>
        {tileData.map((tile, index) => {
          return (
            <div className={classes.gridItem}>
              <Card className={classes.tileCard}>
                <CardMedia
                  component="img"
                  image={tile.img}
                  className={classes.img}
                />
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

ShowsGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowsGridList);