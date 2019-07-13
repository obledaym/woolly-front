import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, MenuItem } from '@material-ui/core';

export const NavLinkRef = React.forwardRef((props, ref) => <NavLink {...props} innerRef={ref} />);

export const NavButton = React.forwardRef((props, ref) => (
	<Button component={NavLinkRef} exact color="inherit" {...props} />
));

export const NavMenuItem = React.forwardRef((props, ref) => (
	<MenuItem component={NavLinkRef} exact {...props} />
));
