import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const DetailBubble = ({ classes, open, anchorEl, onClose, id }) => {
    if (!open) {
        return <div></div>
    }
    else {
        return (
            <div className={classes.container}>
                <div className={classes.eventCard}>
                    <div style={{ flex: 1 }}>
                        <div className={classes.imageContainer}>
                            <img className={classes.eventImage} src="https://dk2600.files.wordpress.com/2016/12/mass-appeal-nas-it-aint-hard-to-tell.jpg?w=1000" />
                        </div>
                    </div>
                    <div className={classes.eventInfo}>
                        <h2 style={{ fontFamily: "Sharp Sans No1 Bold", color: '#00234B', marginBottom: 2 }}>Nas</h2>
                        <p style={{ fontFamily: "Sharp Sans No1 Semibold", color: 'rgb(135, 135, 145)', fontSize: '12px', marginBottom: 3, marginTop: 1 }}>House of Blues</p>
                        <p style={{ fontFamily: "Sharp Sans No1 Semibold", color: '#00234B', fontSize: '12px', marginTop: 2}}>329 N Dearborn St,<br/>Chicago, IL 60654</p>
                    </div>
                </div>
                <div className={classes.exitContainer}>
                    <CloseIcon className={classes.exitIcon} onClick={onClose}/>
                </div>
            </div>
        )
    }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 1.6,
        width: '200px',
        height: '120px',
        backgroundColor: 'white',
        border: '1px solid rgb(0, 35, 75, 0.4)',
        borderRadius: '3px',
        borderBottomLeftRadius: '0px',
        boxShadow: '1px 0px 2px -1px rgba(135,119,135,1)',
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    eventCard: {
        height: '100%',
        width: 'max-content',
        flex: 4,
        display: 'flex',
        overflowX: 'scroll',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
    },
    exitContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
    },
    exitIcon: {
        color: 'darkgray',
        fontSize: 20,
        '&:hover': {
            cursor: 'pointer'
        }
    },
    imageContainer: {
        borderRadius: '50%',
        width: 60,
        height: 60,
        marginTop: 15,
        position: 'relative',
        overflow: 'hidden'
    },
    eventInfo: {
        flexDirection: 'column',
        height: '100%',
        marginLeft: 10,
        flex: 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    eventImage: {
        position: 'absolute',
        top: '-100%',
        left: '-100%',
        bottom: '-100%',
        right: '-100%',
        objectFit: 'cover',
        width: 60,
        height: 60,
        margin: 'auto'
        
    }
});

export default withStyles(styles)(DetailBubble);



