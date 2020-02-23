import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { isEmpty } from '../../utils';

import Loader from '../../components/common/Loader';
import { NavButton } from '../../components/common/Nav';

// import { withStyles } from '@material-ui/core/styles';
// import { Button, Paper, FormControlLabel, Checkbox } from '@material-ui/core';
// import { ShoppingCart, Delete } from '@material-ui/icons';

const connector = connect((store, props) => {
	const asso_id = props.match.params.asso_id;
	return {
		asso_id,
		asso: store.getData(['associations', asso_id], null),
		sales: store.getData(['associations', asso_id, 'sales'], null, false),
	};
})

class AdminDashboard extends React.Component {

	componentDidMount() {
		const { asso_id } = this.props;
		if (!this.props.asso)
			this.props.dispatch(actions.associations.find(asso_id));
		if (!this.props.sales)
			this.props.dispatch(actions.associations(asso_id).sales.get());
	}

	render() {
		const { asso, sales } = this.props;
		window.p = this.props;
		if (asso === null)
			return <Loader />

		const asso_id = this.props.match.params.asso_id;
		return (
			<div className="container">
				<h1>Dashboard de l'asso {asso.shortname}</h1>
				<h2>Informations</h2>

				<h2>Ventes</h2>
				<NavButton to="/admin/sales/create">Créer une vente</NavButton>
				{sales === null ? (
					<Loader text="Chargement des ventes..." />
				) : (
					Object.values(sales).length === 0 ? (
						<div>Aucune vente n'a été créée</div>
					) : (
						Object.values(sales).forEach(sale => (
							<li>{sale.name}</li>
						))
					)
				)}
			</div>
		);
	}
}


export default connector(AdminDashboard);