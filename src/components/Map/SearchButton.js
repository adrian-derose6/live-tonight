import React from 'react';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import { withStyles } from '@material-ui/core/styles';

const SearchButton = ({ toSearch, classes, onClick }) => {
    return (
        (!toSearch) ? 
            <Button variant='raised' className={classes.buttonNoSearch} disableRipple disableFocusRipple>
                <span style={{textTransform: 'none'}}>search by moving map</span>
            </Button>
        : 
            <Button variant='raised' className={classes.buttonSearch} onClick={onClick}>
                <RefreshIcon className={classes.icon} />
                <span style={{textTransform: 'none'}}>redo search here</span>
            </Button>
    );
}

const styles = theme => ({
    buttonNoSearch: {
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: 'white',
            opacity: 0.85,
            cursor: 'default'
        },
        color: "#2B1935",
        borderRadius: 0,
        maxWidth: '200px',
        minWidth: '200px',
        minHeight: '40px',
        maxHeight: '40px',
        position: 'absolute',
        top: 15,
        right: '40%',
        left: '30%',
        zIndex: 2009,
        opacity: 0.85,
        
        fontFamily: "Sharp Sans No1 Semibold"
    },
    buttonSearch: {
        backgroundColor: "#2B1935",
        '&:hover': {
            opacity: 0.75,
            backgroundColor: "#2B1935"
        },
        transition: 'opacity .6s',
        color: "white",
        borderRadius: 0,
        maxWidth: '200px',
        minWidth: '200px',
        minHeight: '40px',
        maxHeight: '40px',
        position: 'absolute',
        top: 15,
        right: '40%',
        left: '30%',
        zIndex: 2009,
        opacity: 0.91,
        fontFamily: "Sharp Sans No1 Semibold"
    },
    icon: {
        fontSize: '20px',
        marginRight: 7
    }
})

export default withStyles(styles)(SearchButton);