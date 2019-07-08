import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow,
				 List, ListItem, ListItemText } from '@material-ui/core';


const ORDER_STATUS = {
	0: { color: 'grey',   label: 'En cours' },
	1: { color: 'yellow', label: 'En attente de Validation' },
	2: { color: 'green',  label: 'Validée' },
	3: { color: 'yellow', label: 'En attente de Paiement' },
	4: { color: 'green',  label: 'Payé' },
	5: { color: 'red',    label: 'Expirée' },
	6: { color: 'black',  label: 'Annulée' },
}


class OrdersList extends React.Component{

	getOrderRow = order => {
		const status = ORDER_STATUS[order.status] || {}
		const statusCell = <span style={{ color: status.color }}>{status.label}</span>;
		const actionsCell = 'TODO Actions'; // TODO

		return (
			<TableRow key={order.id}>
				<TableCell>{order.sale.name}</TableCell>
				<TableCell>{statusCell}</TableCell>
				<TableCell>{actionsCell}</TableCell>
				<TableCell>{this.getOrderlinesList(order.orderlines)}</TableCell>
			</TableRow>
		);
	}

	getOrderlinesList(orderlines) {
		return (
			<List dense disablePadding>
				{orderlines.map(orderline => (
					<ListItem key={orderline.id}>
						<ListItemText primary={`${orderline.quantity} x ${orderline.item.name}`} />
					</ListItem>
				))}
			</List>
		);
	}

	render(){
		const { classes, orders } = this.props

		return(
			<Table>
				<TableHead>
					<TableRow>
						<TableCell className={classes.head}>Vente</TableCell>
						<TableCell className={classes.head}>Statut</TableCell>
						<TableCell className={classes.head}>Action</TableCell>
						<TableCell className={classes.head}>Articles</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{orders.map(this.getOrderRow)}
				</TableBody>
			</Table>
		)
	}
}

OrdersList.propTypes = {
	classes: PropTypes.object.isRequired
}

const styles = theme => ({
	head: {
		fontWeight: 500,
		fontSize: "1em",
		color: "rgba(0,0,0,.7)"
	}
})

export default withStyles(styles)(OrdersList)