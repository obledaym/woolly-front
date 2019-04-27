import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import { MoreVert } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, Menu, MenuItem, Divider } from '@material-ui/core';
import { NavButton, NavMenuItem } from './common/Nav.jsx';


class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			expandMenu: false,
			dropdownTarget: null,
		};
	}

	componentDidMount() {
		this.getUser();
	}

	getURL = action => `${axios.defaults.baseURL}/auth/${action}?redirect=${window.location}`

	getUser = async () => {
		// TODO Add to store
		const resp = await axios.get('auth/me', { withCredentials: true });
		this.setState({ user: resp.data.authenticated ? resp.data.user : null })
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
		const { classes } = this.props;
		const { user } = this.state;

		return (
			<AppBar position="fixed" style={{ height: this.props.height }}>
				<Toolbar className={classes.toolbar + ' container'}>
					<NavLink className={classes.brand} to="/">Woolly</NavLink>
					<div>
						<NavButton to="/">Accueil</NavButton>
						<NavButton to="/ventes">Ventes</NavButton>
						{Boolean(user) ? (
							<React.Fragment>
								<Button color="inherit" onClick={this.openDropdown}>{user.first_name} <MoreVert /></Button>
								<Menu
									anchorEl={this.state.dropdownTarget}
									open={Boolean(this.state.dropdownTarget)}
									onClose={this.closeMenu}
								>
									<NavMenuItem to="/commandes">Mes commandes</NavMenuItem>
									<NavMenuItem to="/compte">Mon compte</NavMenuItem>
									{user.is_admin && (
										<NavMenuItem to="/admin">Administration</NavMenuItem>
									)}
									<Divider />
									<MenuItem component="a" href={this.getURL('logout')}>Se déconnecter</MenuItem>
								</Menu>
							</React.Fragment>
						) : (
							<Button component="a" href={this.getURL('login')} color="inherit">Se connecter</Button>
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
		color: "white",
		textDecoration: "none",
		fontFamily: "roboto, sans-serif"
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

export default withStyles(styles)(Header);
