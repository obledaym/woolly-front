import React from "react"
import PropTypes from "prop-types"
import { withStyles } from '@material-ui/core/styles';

import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core"
import DeliveryRow from "./DeliveryRow"

const DELIVERIES_ARRAY_DATA = [
    { 
        label: "Course de Baignoire dans l'Oise",
        status: 2,
        article: {
            id: 1,
            label: "Cotisation",
            qt: 3
        }
    },
    { 
        label: "Le bon jus de pommes des Ardennes",
        status: 0,
        article: {
            id: 2,
            label: "Cotisation",
            qt: 1
        }
    },
    { 
        label: "Le p'tit jaune de Marseille",
        status: 0,
        article: {
            id: 3,
            label: "Le p'tit jaune",
            qt: 7
        }
    },
    { 
        label: "Course de Baignoire dans ta baignoire",
        status: 1,
        article: {
            id: 1,
            label: "Toi et moi",
            qt: 2
        }
    },
]

class PastDeliveries extends React.Component{
    getDeliveriesRows = () => {
        return DELIVERIES_ARRAY_DATA.map((element, id) => {
            return <DeliveryRow data={element} id={id} key={id}/>
        })
    }
    
    render(){
        const { classes } = this.props
        const renderDeliveriesRows = this.getDeliveriesRows()

        return(
            <div className={classes.root}>
                <h2 className={classes.title}>Mes commandes</h2>
                <div style={{overflowX: "auto"}}>
                    <Table>
                        <TableBody>
                            <TableRow style={{paddingLeft: "1em"}}>
                                <TableCell className={classes.head}>ID</TableCell>
                                <TableCell className={classes.head}>Vente</TableCell>
                                <TableCell className={classes.head}>Statut</TableCell>
                                <TableCell className={classes.head}>Action</TableCell>
                                <TableCell className={classes.head}>Article</TableCell>
                            </TableRow>
                            {renderDeliveriesRows}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}

PastDeliveries.propTypes = {
    classes: PropTypes.object.isRequired
}

const styles = theme => ({
    root: {
        marginLeft: "10px",
        overflow: "hidden"
    },
    title: {
        fontSize: theme.spacing.unit*4,
        fontWeight: 100,
    },
    head: {
        fontWeight: 500,
        fontSize: "1em",
        color: "rgba(0,0,0,.7)"
    }
})

export default withStyles(styles)(PastDeliveries)