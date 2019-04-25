import React from 'react'
import PropTypes from 'prop-types';

import Loader from '../Loader';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableRow, TableCell, TextField } from '@material-ui/core/';

class ItemsTable extends React.Component {
	render() {
 		const { classes, items, quantities } = this.props;
 		if (!items)
 			return <Loader text="Loading items..." />

 		if (items.length === 0)
 			return (
 				<p className={classes.message}>Il n'y a aucun item en vente !</p>
 			);

 		console.log(items)
 		// TODO Group items
		return (
			<Table>
				<TableBody>
					{items.map(item => (
						<TableRow key={item.id} className={classes.trow}>
							<TableCell className={classes.text}>{item.name}</TableCell>
							<TableCell className={classes.text}>{item.price.toFixed(2)} €</TableCell>
							{quantities && (
								<TableCell>
									<TextField
										id={String(item.id)}
										value={quantities[item.id] || 0}
										onChange={this.props.handleQuantityChange}
										type="number"
										inputProps={{ min: 0, max: item.max_per_user }}
										classes={{ root: classes.text }}
										// style={{ width: '3em' }}
										InputLabelProps={{ shrink: true }}
										margin="normal"
									/>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		)
	}
}

ItemsTable.propTypes = {
	classes: PropTypes.object.isRequired,
	items: PropTypes.array,
	quantities: PropTypes.object,
	handleQuantityChange: PropTypes.func,
}

const styles = {
	message: {
		textAlign: 'center',
	},
	text: {
		margin: 0,
		fontSize: 18,
		fontWeight: 100,
	},
	trow: {
		height: 80,
		transition: "box-shadow .45s ease",
		'&:hover': {
			boxShadow: "0 8px 17px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.19)"
		}
	},
	tcell: {
		borderTop: "1px solid rgba(0,0,0,.2)",
		fontFamily: "roboto",
		fontWeight: 100,
		padding: "0.8em 2em"
	},
};

export default withStyles(styles)(ItemsTable);
