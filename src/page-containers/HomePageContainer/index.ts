import { Stack, styled } from '@mui/material';

const HomePageContainer = styled(Stack)(() => ({
    padding: '10px 10px 100px 10px',
    position: 'relative',
    gap: '10px',
    '.delete-search': {
        cursor: 'pointer',
    },
}));

export default HomePageContainer;
