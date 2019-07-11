import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../redux/actions';

import Loader from '../components/Loader';
import ItemsTable from '../components/common/ItemsTable';
import { withStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core/';
import { ShoppingCart, Delete } from '@material-ui/icons';


const decorator = connect((store, props) => {
	const saleId = props.match.params.sale_id;
	return {
		authenticated: Boolean(store.getData('auth', {}).authenticated),
		sale: store.getData(['sales', saleId], null),
		items: store.getData(['sales', saleId, 'items' ], null),
	};
})
class SaleDetail extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			quantities: {},
		};
	}

	componentDidMount() {
		const saleId = Number(this.props.match.params.sale_id);
		if (!this.props.sale)
			this.props.dispatch(actions.sales.find(saleId, { include: 'association' }))
		if (!this.props.items)
				this.props.dispatch(actions.sales(saleId).items.get())
	}

	handleQuantityChange = event => {
		const { id: key, value } = event.currentTarget;
		this.setState(prevState => ({
			quantities: {
				...prevState.quantities,
				[key]: Number(value),
			},
		}));
	}

	handleReset = () => this.setState({ quantities: {} })

	render(){
		const { classes, sale, authenticated } = this.props;
		if (!sale || this.props.fetchingSale)
			return <Loader text="Loading sale..." />

		return(
			<div className="container" style={{paddingTop: "60px"}}>

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
						{ sale.max_item_quantity !== null && (
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
							disabled={!authenticated}
							style={{margin: '0 1em',padding: '.85rem 2.13rem'}}
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
					</div>
				</div>

				{!authenticated && <p className={classes.alert}>Veuillez vous connecter pour acheter.</p>}
				<p>CGV</p>
				<Loader text="Loading items..." loading={this.props.items === null}>
					<Paper className={classes.tableRoot}>
						<ItemsTable
							disabled={!authenticated}
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
			flexDirection: 'column'
		}
	},
	description: {
		textAlign: "justify",
		paddingRight: "24px",
		fontWeight: "100",
		flex: "0 0 50%",
		maxWidth: "50%",
		[theme.breakpoints.down('xs')]:{
			maxWidth: "100%",
			paddingRight: 0
		}
	},
	numbersContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		flexGrow: 2
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
		display: "block",
		fontWeight: "100",
	},
	detailsTitles: {
		fontWeight: 100,
		fontSize: "1.4rem",
	},
	itemsTitle: {
		fontWeight: 100,
		fontSize: "2rem",
		flex: "0 0 50%",
	},
	itemsButtons: {
		flex: "0 0 50%",
		display: "flex",
		flexDirection: "row-reverse",
	},
	itemsHead: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		[theme.breakpoints.down('sm')]: {
			flexDirection: "column"
		}
	},
	tableRoot: {
		width: "100%",
		overflowX: 'auto',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
	alert: {
		textAlign: "center",
		margin: "25px 0",
		color: "#f50057",
		fontSize: "1.2em",
		fontWeight: 100,
	}
});

export default decorator(withStyles(styles)(SaleDetail));