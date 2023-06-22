import { SwipeableDrawer, styled } from '@mui/material';

const Drawer = styled(SwipeableDrawer)(() => ({
    '.close-icon': {
        alignSelf: 'flex-end',
        cursor: 'pointer',
    },
}));

export default Drawer;
