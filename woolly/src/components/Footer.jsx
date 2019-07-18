import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

class Footer extends React.Component{
	render() {
		const { classes, height } = this.props;
		return (
			<div className={classes.contact}  style={{ height }}>
				Made with ♥ by SiMDE. <a className={classes.mailto} href="mailto:simde@assos.utc.fr">Contact</a>
			</div>
		);
	}
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
	height: PropTypes.number.isRequired,
};

const styles = {
	contact: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		width: '100%',
		textAlign: 'center',
		padding: 10,
	},
	mailto: {
		color: '#0275d8',
		textDecoration: 'none',
	},
};

export default withStyles(styles)(Footer);
