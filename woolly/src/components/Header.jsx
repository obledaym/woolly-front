import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { MoreVert, ExpandMore, ExpandLess,
				 Home, ShoppingCart, AccountCircle } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, Menu, Divider } from '@material-ui/core';
import { NavButton, NavMenuItem } from './common/Nav.jsx';

const decorator = connect(store => ({
	auth: store.getData('auth', {}),
}))

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			largeDisplay: false,
			expandDrawer: false,
			authMenuTarget: null,
		};
	}

	componentWillMount() {
		const mediaQuery = window.matchMedia('(min-width: 768px)');
		this.setSize(mediaQuery);
		mediaQuery.addListener(this.setSize);
	}

	setSize = mediaQuery => this.setState({ largeDisplay: mediaQuery.matches })

	openDrawer  = () => this.setState({ expandDrawer: true })
	closeDrawer = () => this.setState({ expandDrawer: false })

	openAuthMenu  = event => this.setState({ authMenuTarget: event.currentTarget })
	closeAuthMenu = event => this.setState({ authMenuTarget: null })

	render() {
		const { auth, classes } = this.props;
		const { largeDisplay, expandDrawer } = this.state;
		return (
			<AppBar position="fixed" style={{ minHeight: this.props.height }}>
				<Toolbar className={'container ' + classes.toolbar}>
					<NavLink className={classes.brand} to="/">Woolly</NavLink>

					{/*largeDisplay || (expandDrawer ? (
						<ExpandLess fontSize="large" onClick={this.closeDrawer} />
					) : (
						<ExpandMore fontSize="large" onClick={this.openDrawer} />
					))*/}

					<div className={largeDisplay ? '' : classes.drawer}>
						<NavButton to="/">{largeDisplay ? 'Accueil' : <Home />}</NavButton>
						<NavButton to="/ventes">{largeDisplay ? 'Ventes' : <ShoppingCart />}</NavButton>
						{auth.authenticated ? (
							<React.Fragment>
								<Button color="inherit" onClick={this.openAuthMenu}>
									{largeDisplay ? (
										<React.Fragment>{auth.user.first_name} <MoreVert /></React.Fragment>
									) : <AccountCircle />}
								</Button>
								<Menu
									anchorEl={this.state.authMenuTarget}
									open={Boolean(this.state.authMenuTarget)}
									onClose={this.closeAuthMenu}
								>
									<NavMenuItem to="/commandes">Mes commandes</NavMenuItem>
									<NavMenuItem to="/compte">Mon compte</NavMenuItem>
									{auth.user.is_admin && (
										<NavMenuItem to="/admin">Administration</NavMenuItem>
									)}
									<Divider />
									<NavMenuItem to="/logout">Se déconnecter</NavMenuItem>
								</Menu>
							</React.Fragment>
						) : (
							<NavButton to="/login">Se connecter</NavButton>
						)}
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = theme => ({
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		margin: 'auto',
		boxSizing: 'border-box',
	},
	brand: {
		fontSize: 20,
		color: 'white',
		textDecoration: 'none',
	},
	logo: {
		maxHeigth: 70,
		maxWidth: 180,
	},
	drawer: {
		backgroundColor: 'red',
	},
});

export default decorator(withStyles(styles)(Header));
