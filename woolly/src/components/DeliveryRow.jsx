import React from "react"
import PropTypes from "prop-types"
import { withStyles } from '@material-ui/core/styles';

import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Link
} from "@material-ui/core"
import { FullscreenExit } from "@material-ui/icons";

class DeliveryRow extends React.Component{
    getStatusLabel = (classes) => {
        switch(this.props.data.status){
            case 0 :
                const component =   <div className={classes.actions}>
                                        <Link href="#">Télécharger mes billets</Link>
                                        <Link href="#">Modifier ma commande</Link>
                                    </div>
                return { 
                    label: <span className={classes.green}>Payée</span>,
                    action: component
                }
            case 1 :
                return {
                    label: <span className={classes.orange}>Non payée</span>,
                    action: null
                }
            case 2 : 
                return {
                    label: <span className={classes.red}>Annulée</span>,
                    action: null
                }
            default : 
                return {
                    label: <span></span>,
                    action: null
                }
        }
    }

    getArticleRendered = (classes) => {
        const element = this.props.data.article
        return(
            <div className={classes.articleValue_table}>
                <div className={classes.articleValue_head}>
                    <div className={classes.articleValue_cell}>ID</div>
                    <div className={classes.articleValue_cell}>Article</div>
                    <div className={classes.articleValue_cell}>Quantité</div>
                </div>
                <div className={classes.articleValue_row}>
                    <div className={classes.articleValue_cell}>{element.id}</div>
                    <div className={classes.articleValue_cell}>{element.label}</div>
                    <div className={classes.articleValue_cell}>{element.qt}</div>
                </div>
            </div>
        )
    }

    render(){
        const { classes } = this.props
        const statusObject = this.getStatusLabel(classes)
        const articleRendered = this.getArticleRendered(classes) 
        
        return(
            <TableRow>
                <TableCell align="center">{this.props.id}</TableCell>
                <TableCell>{this.props.data.label}</TableCell>
                <TableCell>{statusObject.label}</TableCell>
                <TableCell>{statusObject.action}</TableCell>
                <TableCell>{articleRendered}</TableCell>
            </TableRow>
        )
    }
}

DeliveryRow.propTypes = {
    classes: PropTypes.object.isRequired
}

const styles = theme => ({
    articleValue_table: {
        display: "table"
    },
    articleValue_head: {
        display: "table-row",
        borderTop: "1px solid rgba(224, 224, 224, 1)",
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
        fontWeight: 500,
        fontSize: "1em",
        color: "rgba(0,0,0,.7)"
    },
    articleValue_row: {
        display: "table-row"
    },
    articleValue_cell: {
        display: "table-cell",
        padding: "10px 6px"
    },
    actions: {
        display: "flex",
        flexDirection: "column"
    },
    green: {
        color: "rgba(99,180,103,1)"
    },
    red: {
        color: "rgba(244,94,93,1)"
    },
    orange: {
        color: "#FF7F00"
    }
})

export default withStyles(styles)(DeliveryRow)