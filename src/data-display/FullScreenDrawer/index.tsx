import * as React from 'react';
import Drawer from './styles';
import CloseIcon from '@mui/icons-material/Close';

interface FullScreenDrawerProps {
    open: boolean;
    setOpen: (state: boolean) => void;
    children: React.ReactNode;
}

const FullScreenDrawer: React.FunctionComponent<FullScreenDrawerProps> = (props) => {
    return (
        <Drawer
            disableSwipeToOpen
            open={props.open}
            onClose={() => props.setOpen(false)}
            onOpen={() => {}}
            anchor="bottom"
            dir="rtl"
            PaperProps={{
                sx: {
                    borderRadius: '15px 15px 0px 0px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    padding: '20px',
                    gap: '10px',
                },
            }}
        >
            <CloseIcon onClick={() => props.setOpen(false)} className="close-icon" />
            {props.children}
        </Drawer>
    );
};

export default FullScreenDrawer;
