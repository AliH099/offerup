import { Stack, styled } from '@mui/material';

const WizardActionContainer = styled(Stack)(() => ({
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    padding: '10px',
    gap: '5px',
    '.button': {
        paddingBlock: 5,
        borderRadius: '100px',
    },
}));

export default WizardActionContainer;
