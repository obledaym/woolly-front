import React from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

class ContactSpan extends React.Component{
    render(){
        const { classes } = this.props;
        
        return(
            <div className={classes.contact}>
                <span>Made with ♥ by SiMDE. <a className={classes.mailto} href="mailto:simde@assos.utc.fr">Contact</a></span>
            </div>
        )
    }
}

ContactSpan.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    contact: {
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "10px 0",
        fontFamily: "Roboto",
        opacity: 0.7
    },
    mailto: {
        color: "#0275d8",
        textDecoration: "none"
    }
})

export default withStyles(styles)(ContactSpan)