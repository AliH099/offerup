import { Stack, styled } from '@mui/material';

const DetailsContainer = styled(Stack)(({}) => ({
    gap: '30px',
    paddingTop: '30px',
    '.schema-container': {
        paddingTop: '10px',
    },
}));

export default DetailsContainer;
