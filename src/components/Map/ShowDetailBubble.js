import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

const DetailBubble = ({ classes, open, anchorEl, onClose, id }) => {
    return(
        <Popover 
            id={id}
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
        
    }
});

export default withStyles(styles)(DetailBubble);



