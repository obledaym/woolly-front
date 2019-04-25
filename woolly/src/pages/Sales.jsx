import React from 'react'
import { connect } from 'react-redux';
import actions from '../redux/actions';

import Loader from '../components/Loader';
import SaleCard from '../components/common/SaleCard';

const decorator = connect(store => ({
	sales: store.getData('sales', []),
	fetching: store.isFetching('sales'),
	// pagination: store.getPagination('sales'),
}))

class Sales extends React.Component {
	componentDidMount() {
		this.props.dispatch(actions.sales.all({ include: 'association' }));
	}

	render() {
		return(
			<div className="container" style={{ marginTop: '60px' }}>
				<h2 style={titleStyle}>Liste des ventes</h2>
				<Loader loading={this.props.fetching} text=" Récupération des ventes en cours...">
					<div style={{ display: 'flex' }}>
						{this.props.sales.map(sale => <SaleCard key={sale.id} sale={sale} /> )}
					</div>
				</Loader>
			</div>
		)
	}
}

const titleStyle = {
	fontFamily: "roboto, sans-serif",
	fontWeight: "lighter",
	fontSize: "2em",
}

export default decorator(Sales)