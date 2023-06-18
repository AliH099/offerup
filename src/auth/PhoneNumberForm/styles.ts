import { Stack, styled } from '@mui/material';

const PhoneNumberFormContainer = styled(Stack)(() => ({
    gap: '10px',
    '.close-icon': {
        alignSelf: 'flex-end',
    },
    '.description': {
        alignSelf: 'flex-start',
        marginTop: '20px',
    },
}));

export default PhoneNumberFormContainer;
