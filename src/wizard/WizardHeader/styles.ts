import { Stack, styled } from '@mui/material';

const WizardHeaderContainer = styled(Stack)(({}) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingBlock: '10px',
    '.arrow': {
        position: 'absolute',
        left: 0,
    },
    '.button': {
        position: 'absolute',
        right: 0,
    },
}));

export default WizardHeaderContainer;
