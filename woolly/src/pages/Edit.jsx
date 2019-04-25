import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

class Edit extends React.Component {
	state = {
		tickets: [
			{ nom: 'Paul', prenom: 'Berg' },
			{ nom: 'Jean', prenom: 'Bonneau' },
		]
	}

	render() {
		const formatKey = key => key[0].toUpperCase() + key.slice(1);
		const { classes } = this.props;
		const { tickets } = this.state;
		return(
			<div className="container" style={{marginTop: "60px"}}>
				<h1>Modification des tickets</h1>
				<Paper>
					<Table>
						<TableBody>
							{
								tickets.map((ticket, tid) => 
									<TableRow key={tid} className={classes.trow}>
										{
											Object.keys(ticket).map((key, id) => 
												<TableCell key={id} className={classes.text}>
													{
														<TextField
															label={formatKey(key)}
															value={ticket[key]}
															onChange={e => this.setState({ 
																tickets: tickets.map((ticket, id) => id === tid ? {...ticket, [key]: e.target.value} : ticket)
															})}
															classes={{ root: classes.text }}
															InputLabelProps={{ shrink: true }}
															margin="normal"
														/>
													}
												</TableCell>
											)
										}
									</TableRow>
								)
							}
						</TableBody>
					</Table>
				</Paper>
				<Button
					color="primary"
					variant="contained"
					className={classes.saveButton}>
					Sauvegarder
				</Button>
			</div>
		);
	}
}

const styles = theme => ({
	trow: {
		height: 80,
		transition: "box-shadow .45s ease",
		'&:hover': {
			boxShadow: "0 8px 17px 0 rgba(0,0,0,.2), 0 6px 20px 0 rgba(0,0,0,.19)"
		}
	},
	tcell: {
		borderTop: "1px solid rgba(0,0,0,.2)",
		fontFamily: "roboto",
		fontWeight: 100,
		padding: "0.8em 2em"
	},
	saveButton: {
		marginTop: 50,
	},
	title: {
		fontFamily: 'roboto',
		fontWeight: 100,
		fontSize: '3rem',
		textAlign: 'center',
		margin: '5px 0',
	},
	subtitle: {
		textAlign: 'center',
		fontFamily: 'roboto',
		fontWeight: 100,
		fontSize: '1.3rem',
		marginTop: 0,
	},
	text: {
		margin: 0,
		fontSize: 18,
    fontWeight: 100,
	},
	tableRoot: {
		width: "100%",
		overflowX: 'auto',
		marginTop: theme.spacing.unit*3,
		marginBottom: theme.spacing.unit*3
	},
});

export default withStyles(styles)(Edit);
