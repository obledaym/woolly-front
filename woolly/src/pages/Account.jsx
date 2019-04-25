import React from "react"
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import AccountInformations from "../components/AccountInformations"
import PastDeliveries from "../components/PastDeliveries"

class Account extends React.Component {
    render(){
        const { classes } = this.props

        return(
            <div className={classes.root}>
                <h1 className={classes.title}>Mon Compte</h1>
                <div className={classes.inner}>
                    <AccountInformations/>
                    <PastDeliveries/>
                </div>
            </div>
        )
    }
}

Account.propTypes = {
    classes: PropTypes.object.isRequired,
}

const styles = theme => ({
    title: {
        fontSize: theme.spacing.unit*5,
        fontWeight: 200
    },
    detailsContainer: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up('md')]:{
            flexDirection: "row"
        }
    },
    root: {
        marginLeft: "5%",
        marginRight: "0",
        [theme.breakpoints.down('md')]:{
            marginRight: "2%",
            marginLeft: "2%"
        }
    },
    inner: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    }
})

export default withStyles(styles)(Account)