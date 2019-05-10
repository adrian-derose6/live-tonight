import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

const DetailBubble = ({ classes, open, anchorEl, onClose, id }) => {
    if (!open) {
        return <div></div>
    }
    else {
        return (
            <div className={classes.container}>
                <span onClick={onClose}>exit</span>
            </div>
        )
    }
}

const styles = theme => ({
    container: {
        position: 'absolute',
        width: '186px',
        height: '140px',
        backgroundColor: 'white',
        border: '1px solid gray',
        borderRadius: '3px',
        boxShadow: '1px 0px 2px -1px rgba(135,119,135,1)'
    }
});

export default withStyles(styles)(DetailBubble);



