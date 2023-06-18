import { SwipeableDrawer, styled } from '@mui/material';

const LoginDrawer = styled(SwipeableDrawer)(() => ({
    '.close-icon': {
        alignSelf: 'flex-end',
    },
}));

export default LoginDrawer;
