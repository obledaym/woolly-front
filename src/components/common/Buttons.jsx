import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Button, CircularProgress,
} from '@material-ui/core';

export function LoadingButton({ loading, disabled, LoaderProps = {}, startIcon = null, ...props }) {
    const loader = <CircularProgress size="1em" {...LoaderProps} />;
    return (
        <Button
            startIcon={loading ? loader : props.startIcon}
            disabled={disabled || loading}
            {...props}
        />
    );
}


export function ConfirmButton(props) {
    const {
        onClick, content, title, text, yes = "Oui", no = "Non",
        buttons, colors = {}, ...buttonProps
    } = props;
    const [event, setEvent] = React.useState(null);
    const close = () => setEvent(null);
    function onConfirmClick() {
        onClick(event);
        close();
    }
    return (
        <React.Fragment>
            <Dialog open={event !== null} onClose={close}>
                {content || (
                    <React.Fragment>
                        <DialogTitle>{title}</DialogTitle>
                        {text && (
                            <DialogContent>
                                <DialogContentText>
                                    {text}
                                </DialogContentText>
                            </DialogContent>
                        )}
                        <DialogActions>
                            {buttons ? buttons(close) : (
                                <React.Fragment>
                                    <Button
                                        onClick={close}
                                        color={colors.secondary || 'secondary'}
                                    >
                                        {no}
                                    </Button>
                                    <Button
                                        onClick={onConfirmClick}
                                        color={colors.primary || 'primary'}
                                    >
                                        {yes}
                                    </Button>
                                </React.Fragment>
                            )}
                        </DialogActions>
                    </React.Fragment>
                )}
            </Dialog>
            <Button
                onClick={event => { setEvent({ target: event.target, currentTarget: event.currentTarget }) }}
                {...buttonProps}
            />
        </React.Fragment>
    );
}