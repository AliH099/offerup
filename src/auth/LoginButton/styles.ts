import { Stack, styled } from '@mui/material';

const LoginButtonContainer = styled(Stack)(() => ({
    '.paper': {
        width: '200px',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '10px',
        padding: '20px 0px',
        direction: 'ltr',
        gap: '10px',
    },
    '.log-out-option': {
        marginInline: '28px',
    },
}));

export default LoginButtonContainer;
