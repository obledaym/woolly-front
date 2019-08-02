import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import axios from 'axios';

import Loader from '../components/common/Loader';
import ItemsTable from '../components/sales/ItemsTable';
import { withStyles } from '@material-ui/core/styles';
import { Button, Paper, FormControlLabel, Checkbox } from '@material-ui/core';
import { ShoppingCart, Delete } from '@material-ui/icons';


const connector = connect((store, props) => {
	const saleId = props.match.params.sale_id;
	window.s = store
	return {
		authenticated: Boolean(store.getData('auth', {}).authenticated),
		sale: store.getData(['sales', saleId], null),
		order: store.getData(['sales', saleId, 'userOrder'], null),
		items: store.getData(['sales', saleId, 'items'], []),
		itemsFetched: store.isFetched(['sales', saleId, 'items']),
	};
})
class SaleDetail extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			quantities: {},
			buying: false,
			cgvAccepted: false,
		};
	}

	componentDidMount() {
		const saleId = Number(this.props.match.params.sale_id);
		if (!this.props.order)
			this.fetchOrder();
		if (!this.props.sale)
			this.props.dispatch(actions.sales.find(saleId, { include: 'association' }));
		if (!this.props.itemsFetched)
			this.props.dispatch(actions.sales(saleId).items.get());
	}

	componentDidUpdate(prevProps) {
		const { order } = this.props;

		// Update quantities from current order
		if (prevProps.order !== order) {
			this.setState({
				quantities: order ? order.orderlines.reduce((acc, { item, quantity }) => {
					acc[item.id || item] = quantity;
					return acc;
				}, {}) : {},
			});
		}
	}

	fetchOrder = () => {
		const saleId = Number(this.props.match.params.sale_id);
		this.props.dispatch(
			actions.sales(saleId).orders
						 .definePath(['sales', saleId, 'userOrder' ])
						 .setOptions({ meta: { action: 'updateAll'} })
						 .create({ include: 'orderlines' })
		);
	}

	saveOrder = (event, notif = true, update = true) => {
		if (!this.props.order) {
			console.warn("No order")
			return;
		}

		// Save all orderlines
		const order = this.props.order.id;
		const options = { withCredentials: true };
		const promiseList = Object.entries(this.state.quantities).reduce((acc, [item, quantity]) => {
			acc.push(axios.post('orderlines', { order, item: parseInt(item), quantity }, options));
			return acc;
		}, []);

		const promise = Promise.all(promiseList);
		if (notif) // TODO
			promise.then(resp => console.log('Saved'))
		if (update)
			promise.then(resp => this.fetchOrder())
		return promise
	}

	// -----------------------------------------------------
	// 		Event handlers
	// -----------------------------------------------------

	toggleCGV = event => this.setState(prevState => ({ cgvAccepted: !prevState.cgvAccepted }))

	handleQuantityChange = event => {
		const { id, value } = event.currentTarget;
		this.setState(prevState => ({
			quantities: {
				...prevState.quantities,
				[id]: Number(value),
			},
		}));
	}

	handleReset = event => this.setState({ quantities: {} })

	handleBuy = event => {
		if (!this.canBuy())
			return;
		this.setState({ buying: true }, async () => {
			// Save order
			await this.saveOrder();

			// Redirect to payment
			const order = this.props.order.id;
			const returnUrl = window.location.href.replace(this.props.location.pathname, `/orders/${order}`);
			const resp = await axios.get(`/orders/${order}/pay?return_url=${returnUrl}`, { withCredentials: true });
			window.location.href = resp.data.url;
		});
	}

	// -----------------------------------------------------
	// 		Display
	// -----------------------------------------------------

	canBuy = () => (
		this.props.authenticated
		&& this.state.cgvAccepted
		&& Object.values(this.state.quantities).some(qt => qt > 0)
	)

	areItemsDisabled = () => (
		!this.props.authenticated
		|| (this.props.order && this.props.order.status === 3)
	)

	getErrors() {
		const { order, authenticated } = this.props;
		let errors = [];
		if (order && order.status === 3)
			return ["Veuillez payer ou annuler votre commande en cours."];
		if (!authenticated)
			errors.push("Veuillez vous connecter pour acheter.");
		if (!this.state.cgvAccepted)
			errors.push("Veuillez accepter les CGV pour acheter");
		return errors;
	}

	render() {
		const { classes, sale } = this.props;
		const { cgvAccepted } = this.state;
		if (!sale || this.props.fetchingSale)
			return <Loader fluid text="Loading sale..." />
		window.p = this.props // DEBUG
		window.a = actions // DEBUG

		return (
			<div className="container">
				<h1 className={classes.title}>{sale.name}</h1>
				<h2 className={classes.subtitle}>Organisé par {sale.association.name}</h2>

				<div className={classes.details}>
					<div className={classes.description}>
						<h4 className={classes.detailsTitles}>Description</h4>
						<p>{sale.description}</p>
					</div>
					<div className={classes.numbersContainer}>
						<div className={classes.numbers}>
							<h4 className={classes.detailsTitles}>Dates</h4>
							<span className={classes.date}>Ouverture: {sale.begin_at}</span>
							<span className={classes.date}>Fermeture: {sale.end_at}</span>
						</div>
						{sale.max_item_quantity !== null && (
							<div className={classes.numbers}>
								<h4 className={classes.detailsTitles}>Quantités </h4>
								<p style={{fontSize: "1.6em"}}>{sale.max_item_quantity}</p>
							</div>
						)}
					</div>
				</div>

				<div className={classes.itemsHead}>
					<h3 className={classes.itemsTitle}>Items en ventes</h3>
					<div className={classes.itemsButtons}>
						<Button
							color="primary"
							variant="contained"
							disabled={!this.canBuy()}
							style={{margin: '0 1em',padding: '.85rem 2.13rem'}}
							onClick={this.handleBuy}
						>
							<ShoppingCart className={classes.icon} /> ACHETER
						</Button>
						<Button
							color="secondary" 
							variant="outlined" 
							style={{margin: '0 1em',padding: '.85rem 2.13rem', borderWidth: "2px"}}
							onClick={this.handleReset}
						>
							<Delete className={classes.icon} /> VIDER
						</Button>
						<Button
							color="secondary" 
							variant="outlined" 
							style={{margin: '0 1em',padding: '.85rem 2.13rem', borderWidth: "2px"}}
							onClick={this.saveOrder}
						>
							SAVE
						</Button>
					</div>
				</div>

				<p>
					<FormControlLabel
						control={<Checkbox checked={cgvAccepted} onChange={this.toggleCGV} />}
						label="J'accepte les conditions générales de ventes (TODO Lien)"
					/>
				</p>

				{this.getErrors().map((error, index) => (
					<p key={index} className={classes.alert}>{error}</p>
				))}

				<Loader text="Loading items..." loading={!this.props.itemsFetched}>
					<Paper className={classes.tableRoot}>
						<ItemsTable
							disabled={this.areItemsDisabled()}
							items={this.props.items}
							quantities={this.state.quantities}
							handleQuantityChange={this.handleQuantityChange}
						/>				
					</Paper>
				</Loader>
			</div>
		)
	}
}

SaleDetail.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = theme => ({
	title: {
		fontWeight: 100,
		fontSize: '3rem',
		textAlign: 'center',
		margin: '5px 0',
	},
	subtitle: {
		textAlign: 'center',
		fontWeight: 100,
		fontSize: '1.3rem',
		marginTop: 0,
	},
	details: {
		display: 'flex',
		flexDirection: 'row',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
		},
	},
	description: {
		textAlign: 'justify',
		paddingRight: '24px',
		fontWeight: '100',
		flex: '0 0 50%',
		maxWidth: '50%',
		[theme.breakpoints.down('xs')]:{
			maxWidth: '100%',
			paddingRight: 0,
		},
	},
	numbersContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		flexGrow: 2,
	},
	text: {
		margin: 0,
		fontSize: 18,
		fontWeight: 100,
	},
	icon: {
		marginRight: 10,
	},
	date: {
		display: 'block',
		fontWeight: 100,
	},
	detailsTitles: {
		fontWeight: 100,
		fontSize: '1.4rem',
	},
	itemsTitle: {
		fontWeight: 100,
		fontSize: '2rem',
		flex: '0 0 50%',
	},
	itemsButtons: {
		flex: '0 0 50%',
		display: 'flex',
		flexDirection: 'row-reverse',
	},
	itemsHead: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
		},
	},
	tableRoot: {
		width: '100%',
		overflowX: 'auto',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
	alert: {
		textAlign: 'center',
		margin: '25px 0',
		color: '#f50057',
		fontSize: '1.2em',
		fontWeight: 100,
	},
});

export default connector(withStyles(styles)(SaleDetail));