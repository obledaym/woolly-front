import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

class ContactSpan extends React.Component{
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.contact}>
				Made with ♥ by SiMDE. <a className={classes.mailto} href="mailto:simde@assos.utc.fr">Contact</a>
			</div>
		);
	}
}

ContactSpan.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = theme => ({
	contact: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		width: '100%',
		textAlign: 'center',
		padding: 10,
		fontFamily: "Roboto",
		opacity: 0.7
	},
	mailto: {
		color: "#0275d8",
		textDecoration: "none"
	}
});

export default withStyles(styles)(ContactSpan);
