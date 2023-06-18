import { Stack, styled } from '@mui/material';

const LoginOptionsContainer = styled(Stack)(() => ({
    gap: '18px',
    margin: '0 0 10px 0',
    '.divider': {
        borderBottomWidth: '1.5px',
    },
    '.text': {
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        cursor: 'pointer',
        width: 'fit-content',
    },
}));

export default LoginOptionsContainer;
