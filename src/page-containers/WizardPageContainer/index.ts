import { Stack, styled } from '@mui/material';

const WizardPageContainer = styled(Stack)(({}) => ({
    height: '100vh',
    '.content': {
        paddingInline: '20px',
        position: 'relative',
        height: '100%',
    },
}));

export default WizardPageContainer;
