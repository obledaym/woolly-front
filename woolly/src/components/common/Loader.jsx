import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core'; 

class Loader extends React.Component {
	render() {
		if (this.props.children && !this.props.loading)
			return this.props.children;

		// Show loader
		const { classes, fluid, text, size, direction } = this.props;
		let containerClasses = [classes.container, classes[size], classes[direction] ];
		if (fluid)
			containerClasses.push(classes.fluid);
		
		return (
			<div className={containerClasses.join(' ')}>
				<CircularProgress className={classes.spinner} />
				{text && <span className="text">{text}</span>}
			</div>
		)
	}
}

Loader.propTypes = {
	classes: PropTypes.object.isRequired,
	loading: PropTypes.bool,
	text: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
	direction: PropTypes.string,
}

Loader.defaultProps = {
	loading: true,
	fluid: true,
	size: 'md',
	direction: 'right',
}

const styles = {
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	fluid: {
		margin: 'auto',
	},
	spinner: {
		margin: '0.5em',
	},
	// sm: {
	// 	'& .spinner':
	// 	'& .text'
	// },
	// md: {

	// },
	// lg: {

	// },
	// xl: {

	// }
}

export default withStyles(styles)(Loader);
