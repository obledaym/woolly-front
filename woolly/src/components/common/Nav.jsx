import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, MenuItem } from '@material-ui/core';

export const NavButton = props => (
	<Button component={NavLink} exact color="inherit" {...props} />
)

export const NavMenuItem = props => (
	<MenuItem component={NavLink} exact {...props} />
)
