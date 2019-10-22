import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import ShowTile from './ShowTile.js';

const styles = theme => ({
  root: {
    width: '100%',
    margin: '0 auto',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  gridRow: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    height: '100%'
  },
  gridList: {
    minHeight: '100%',
    minWidth: '100%'
  },

  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
    /* Styles applied to the root element if `titlePosition="bottom"`. */
    titlePositionBottom: {
      bottom: 0,
    },
    /* Styles applied to the root element if `titlePosition="top"`. */
    titlePositionTop: {
      top: 0,
    },
    /* Styles applied to the root element if a `subtitle` is provided. */
    rootSubtitle: {
      height: 68,
    },
    /* Styles applied to the title and subtitle container element. */
    titleWrap: {
      flexGrow: 1,
      marginLeft: 16,
      marginRight: 16,
      color: theme.palette.common.white,
      overflow: 'hidden',
    },
    /* Styles applied to the container element if `actionPosition="left"`. */
    titleWrapActionPosLeft: {
      marginLeft: 0,
    },
    /* Styles applied to the container element if `actionPosition="right"`. */
    titleWrapActionPosRight: {
      marginRight: 0,
    },
    /* Styles applied to the title container element. */
    title: {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: '24px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    /* Styles applied to the subtitle container element. */
    subtitle: {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 1,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    /* Styles applied to the actionIcon if supplied. */
    actionIcon: {},
    /* Styles applied to the actionIcon if `actionPosition="left"`. */
    actionIconActionPosLeft: {
      order: -1,
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

function ShowsGridList({ classes }) {
	return (
    <div className={classes.root}>
      <div className={classes.gridRow}>
        {tileData.map((tile, index) => {
          return (
            <ShowTile image={tile.img} artist={tile.artist} venue={tile.venue} key={index} />
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