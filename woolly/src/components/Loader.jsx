import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core'; 

class Loader extends React.Component {
	render() {
		if (this.props.children && !this.props.loading)
			return this.props.children;

		// Show loader
		const { classes, text, size, direction } = this.props;
		return (
			<div className={[classes.container, classes[size], classes[direction] ].join(' ')}>
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
	size: 'md',
	direction: 'right',
}

const styles = {
	container: {
		margin: 'auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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
