import { LoadingButton } from '@mui/lab';
import { Button, Stack, SwipeableDrawer, Typography } from '@mui/material';
import * as React from 'react';

interface WarningDrawerProps {
    open: boolean;
    setOpen: (state: boolean) => void;
    onAccept: () => void;
    onReject: () => void;
    warningText?: string;
    acceptText?: string;
    rejectText?: string;
    acceptLoading?: boolean;
}

const WarningDrawer: React.FunctionComponent<WarningDrawerProps> = (props) => {
    return (
        <SwipeableDrawer
            anchor="bottom"
            open={props.open}
            onOpen={() => {}}
            onClose={() => props.setOpen(false)}
            disableSwipeToOpen
            PaperProps={{
                sx: {
                    borderRadius: '15px 15px 0px 0px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    gap: '10px',
                },
            }}
        >
            <Typography variant="body1">{props.warningText}</Typography>
            <Stack direction="row" width="100%" gap="10px">
                <LoadingButton
                    variant="contained"
                    fullWidth
                    onClick={props.onAccept}
                    loading={props.acceptLoading}
                >
                    {props.acceptText}
                </LoadingButton>
                <Button variant="outlined" fullWidth onClick={props.onReject}>
                    {props.rejectText}
                </Button>
            </Stack>
        </SwipeableDrawer>
    );
};

WarningDrawer.defaultProps = {
    acceptText: 'بله',
    rejectText: 'خیر',
};

export default WarningDrawer;
