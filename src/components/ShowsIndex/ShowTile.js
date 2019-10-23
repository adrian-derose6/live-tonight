import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import friendAvatar from './friend_avatar.jpg';


const ShowTile = ({ classes, image, artist, venue }) => {
    return (
        <div className={classes.gridItem}>
            <Card className={classes.tileCard}>
                
                <div className={classes.topContainer}>
                </div>
                <div className={classes.tileBar}>
                    <div className={classes.tileBarTop}>
                        <span className={classes.tileBarHeading}>{artist}</span>
                        <span className={classes.tileBarVenue}>{venue}</span>
                    </div>
                    <div className={classes.tileBarMiddle}>

                    </div>
                    <div className={classes.tileBarBottom}>
                        <Avatar className={classes.avatar} src={friendAvatar} sizes={"20"} />
                    </div>    
                </div>
                <CardMedia
                    component="img"
                    image={image}
                    className={classes.img}
                />
            </Card>
        </div>
    )
};

const styles = theme => ({
    gridItem: {
        [theme.breakpoints.down('xs')]: {
            flexBasis: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            flexBasis: '50%',
        },
        [theme.breakpoints.up('md')]: {
            flexBasis: '100%'
        },
        [theme.breakpoints.up('lg')]: {
            flexBasis: '50%'
        },
        flexBasis: '50%',
        height: '60%',
        width: 259,
        position: 'relative',
        boxSizing: 'border-box',
        padding: 4
    },
    tileCard: {
        '&:hover': {
            cursor: 'pointer'
        },
        width: '100%',
        height: '100%',
        borderRadius: 0,
        boxShadow:'0px 0px 5px -2px rgba(140,138,140,1)',
        padding: 1,
        display: 'inline-block',
        position: 'relative'
    },
    img: {
        minHeight: '100%',
        minWidth: '100%', 
        position: 'absolute',
        bottom: 40,
        zIndex: 0,
        objectFit: 'cover'
      },
    tileBar: {
        position: 'absolute',
        boxShadow:'0px 0px 20px 2px rgba(0,0,0,0.53)',
        left: 0,
        right: 0,
        bottom: 0,
        minHeight: '30%',
        maxWidth: '100%',
        backgroundColor: 'white',
        fontFamily: theme.typography.fontFamily,
        padding: 0,
        zIndex: 1000,
        display: 'grid',
        padding: '11px 14px 13px',
        gridArea: 'bottom',
        gridTemplateRows: 'repeat(3, auto)',
        gridTemplateColumns: '1fr',
        color: '#2B1935',
        borderBottom: '4px #2B1935 solid'
    },
    tileBarTop: {
     
        display: 'flex',
        justifyContent: 'space-between',
        padding: 0,
        alignItems: 'flex-start'
    },
    tileBarMiddle: {
    
    },
    tileBarBottom: {
      
    },
    avatar: {
        height: 25,
        width: 25
    },
    tileBarHeading: {
        fontSize: '1.1em',
        fontFamily: "Sharp Sans No1 Bold",
    },
    tileBarVenue: {
        fontFamily: "Sharp Sans No1 Semibold"
    },
    topContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        maxHeight: '70%',
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: theme.typography.fontFamily,
        padding: 0
    },
})

export default withStyles(styles)(ShowTile);