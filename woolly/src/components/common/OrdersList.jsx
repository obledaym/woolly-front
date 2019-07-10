import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { SaveAlt, Edit, PlayCircleOutline, Clear } from '@material-ui/icons';
import { Table, TableBody, TableCell, TableHead, TableRow,
				 List, ListItem, ListItemText, Button } from '@material-ui/core';
import { textOrIcon } from '../../utils';

const ORDER_STATUS = {
	0: { color: 'grey',   actions: [ 'cancel', ],           label: 'En cours' },
	1: { color: 'yellow', actions: [ 'cancel', ],           label: 'En attente de Validation' },
	2: { color: 'green',  actions: [ 'tickets', 'modify' ], label: 'Validée' },
	3: { color: 'yellow', actions: [ 'cancel', ],           label: 'En attente de Paiement' },
	4: { color: 'green',  actions: [ 'tickets', 'modify' ], label: 'Payé' },
	5: { color: 'red',    actions: [],                      label: 'Expirée' },
	6: { color: 'black',  actions: [],                      label: 'Annulée' },
}

// TODO onClick
const ACTIONS = {
	tickets:  { text: "Télécharger les billets", icon: SaveAlt,           onClick: null },
	modify:   { text: "Modifier la commande",    icon: Edit,              onClick: null },
	continue: { text: "Continuer la commande",   icon: PlayCircleOutline, onClick: null },
	cancel:   { text: "Annuler la commande",     icon: Clear,             onClick: null },
}

const Cell = withStyles({
	head: {
		fontWeight: 500,
		fontSize: '1em',
		color: 'rgba(0,0,0,.7)',
	},
	root: {
		padding: '8px 5px',
	},
})(TableCell);

class OrdersList extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			displayTextAction: false,
		}
	}

	componentWillMount() {
		const mediaQuery = window.matchMedia('(min-width: 1200px)');
		this.setSize(mediaQuery);
		mediaQuery.addListener(this.setSize);
	}

	componentWillUnmount() {
		window.matchMedia('(min-width: 1200px)').removeListener(this.setSize);
	}

	setSize = mediaQuery => this.setState({ displayTextAction: mediaQuery.matches })

	getOrderRow = order => {
		const status = ORDER_STATUS[order.status] || {};
		const statusCell = <span style={{ color: status.color }}>{status.label}</span>;
		const actionsCell = status.actions.map(key => {
			const { text, icon, onClick } = ACTIONS[key];
			return (
				<Button key={key} size="small" title={text} onClick={onClick}>
					{textOrIcon(text, icon, this.state.displayTextAction)}
				</Button>
			);
		});

		return (
			<TableRow key={order.id}>
				<Cell>{order.sale.name}</Cell>
				<Cell align="center">{statusCell}</Cell>
				<Cell align="center">{actionsCell}</Cell>
				<Cell>{this.getOrderlinesList(order.orderlines)}</Cell>
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

	render() {
		const { classes, orders } = this.props
		return(
			<div className={classes.container}>
				<Table>
					<TableHead>
						<TableRow className={classes.row}>
							<Cell>Vente</Cell>
							<Cell align="center">Statut</Cell>
							<Cell align="center">Action</Cell>
							<Cell>Articles</Cell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map(this.getOrderRow)}
					</TableBody>
				</Table>
			</div>
		);
	}
}

OrdersList.propTypes = {
	classes: PropTypes.object.isRequired
}

const styles = theme => ({
	container: {
		overflowX: 'auto',
	},
	row: {
		height: '48px',
	},
});

export default withStyles(styles)(OrdersList)