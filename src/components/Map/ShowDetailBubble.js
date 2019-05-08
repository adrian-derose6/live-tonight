import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

const DetailBubble = ({ classes, open, anchorEl, onClose, id }) => {
    return(
        <Popover 
            id={id}
            classes={{ paper: classes.container}}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
        >
        </Popover>
    )
}

const styles = theme => ({
    container: {
        position: 'absolute',
        left: 0,
        top: 0, 
        right: 0,
        bottom: 0,
        width: '200px',
        height: '150px'
    }
});

export default withStyles(styles)(DetailBubble);



