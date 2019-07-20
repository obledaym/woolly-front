import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../redux/actions';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'; 
import Loader from '../components/common/Loader';

import AccountDetails from '../components/users/AccountDetails';
import OrdersList from '../components/orders/OrdersList';


const ORDERS_PATH = ['auth', 'orders'];
const connector = connect(store => {
	const auth = store.getData('auth', {})
	return {
		user: auth.authenticated ? auth.user : null,
		orders: auth.authenticated ? store.getData(ORDERS_PATH, []) : [],
		fetching: store.isFetching(ORDERS_PATH),
		fetched: store.isFetched(ORDERS_PATH),
		// pagination: store.getPagination('orders'),
	};
})

class Account extends React.Component {

	componentDidMount() {
		if (!this.props.fetched)
			this.fetchOrders();
	}

	componentDidUpdate(prevProps) {
		if (this.props.user && this.props.user !== prevProps.user)
			this.fetchOrders();
	}

	fetchOrders() {
		this.props.dispatch(actions(`users/${this.props.user.id}/orders`)
							.definePath(ORDERS_PATH)
							.all({ include: 'sale,orderlines,orderlines__item,orderlines__orderlineitems' }));
	}

	render() {
		const { classes } = this.props;
		return (
			<div className="container">
				<h1 className={classes.title}>Mon Compte</h1>
				<Grid container spacing={2}>
					<Grid item xs={12} md={4}>
						<h2 className={classes.title}>Mes informations</h2>
						<AccountDetails user={this.props.user} />
					</Grid>
					<Grid item xs={12} md={8}>
						<h2 className={classes.title}>Mes commandes</h2>
						<Loader loading={this.props.fetching && !this.props.fetched}>
							<OrdersList orders={this.props.orders} />
						</Loader>
					</Grid>
				</Grid>
			</div>
		)
	}
}

Account.propTypes = {
	classes: PropTypes.object.isRequired,
}

// TODO Remvoe
const styles = theme => ({
	title: {
		fontSize: 32,
		fontWeight: 100,
	},
})

export default connector(withStyles(styles)(Account));
