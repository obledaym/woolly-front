import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { MoreVert } from '@material-ui/icons';
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
			expandMenu: false,
			dropdownTarget: null,
		};
	}

	openDropdown = event =>{
		this.setState({ dropdownTarget: event.currentTarget });
		document.addEventListener('mouseup', this.closeDropdown);
	}

	closeDropdown = event => {
		document.removeEventListener('mouseup',this.closeDropdown);
		if (this.state.dropdownTarget)
			this.setState({ dropdownTarget: null });
	}

	render() {
		const { auth, classes } = this.props;
		return (
			<AppBar position="fixed" style={{ height: this.props.height }}>
				<Toolbar className={classes.toolbar + ' container'}>
					<NavLink className={classes.brand} to="/">Woolly</NavLink>
					<div>
						<NavButton to="/">Accueil</NavButton>
						<NavButton to="/ventes">Ventes</NavButton>
						{auth.authenticated ? (
							<React.Fragment>
								<Button color="inherit" onClick={this.openDropdown}>{auth.user.first_name} <MoreVert /></Button>
								<Menu
									anchorEl={this.state.dropdownTarget}
									open={Boolean(this.state.dropdownTarget)}
									onClose={this.closeMenu}
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
	},
	brand: {
		fontSize: 20,
		color: 'white',
		textDecoration: 'none',
		fontFamily: 'Roboto, sans-serif'
	},
	logo: {
		maxHeigth: 70,
		maxWidth: 180,
	},
	menuButton: {
		color: 'inherit',
		// fontSize: 20,
	},
});

export default decorator(withStyles(styles)(Header));
