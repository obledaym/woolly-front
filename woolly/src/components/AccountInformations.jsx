import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core"


const ACCOUNT_INFORMATION_DATA = {
    email: "victor.ronfaut@etu.utc.fr",
    nom: "ronfaut",
    prenom: "victor",
    type: 1
}

class AccountInformations extends React.Component{
    render(){
        const { classes } = this.props

        return(
            <div>
                <h2 className={classes.title}>Mes informations</h2>
                <Table>
                    <TableBody>
                        <TableRow className={classes.topborder}>
                            <TableCell className={classes.label}>Email</TableCell>
                            <TableCell className={classes.value}>{ACCOUNT_INFORMATION_DATA.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.label}>Prénom</TableCell>
                            <TableCell className={classes.value}>{ACCOUNT_INFORMATION_DATA.prenom.charAt(0).toUpperCase() + ACCOUNT_INFORMATION_DATA.prenom.slice(1)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.label}>Nom</TableCell>
                            <TableCell className={classes.value}>{ACCOUNT_INFORMATION_DATA.nom.toUpperCase()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.label}>Type</TableCell>
                            <TableCell className={classes.value}>{ACCOUNT_INFORMATION_DATA.type == 1 ?"Cotisant BDE":"Extérieur"}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}

AccountInformations.propTypes = {
    classes : PropTypes.object.isRequired
}

const styles = theme => ({
    title: {
        fontSize: theme.spacing.unit*4,
        fontWeight: 100,
    },
    topborder: {
        borderTop: "1px solid rgba(224, 224, 224, 1)"
    },
    label: {
        fontWeight: "500",
        fontSize: "1em"
    },
    value: {
        fontWeight: "200"
    }
})

export default withStyles(styles)(AccountInformations)