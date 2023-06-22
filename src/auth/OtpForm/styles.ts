import { Box, Stack, styled } from '@mui/material';

const OtpFormContainer = styled(Stack)(({ theme }) => ({
    padding: '10px',
    gap: '30px',
    '.title': {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    '.content': {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: 0,
    },
    '.top-section': {
        padding: { md: '0 28px', xs: '0px' },
        fontSize: '30px',
        gap: '10px',
    },
    '.otp-input-section': {
        height: '60px',
        alignSelf: 'center',
        margin: '5px 0 20px 0',
        direction: 'rtl',
    },
    '.helper-text-container': {
        direction: 'ltr',
    },
    '.helper-text': {
        color: theme.palette.error.main,
        lineHeight: '20px',
        alignSelf: 'flex-start',
        dir: 'ltr',
        mt: '5px',
    },
    '.login-button': {
        borderRadius: '12px',
    },
}));

export default OtpFormContainer;
