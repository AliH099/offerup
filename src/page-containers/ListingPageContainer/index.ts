import { Stack, styled } from '@mui/material';

const ListingPageContainer = styled(Stack)(() => ({
    gap: '10px',
    '.content': {
        padding: '20px',
        gap: '20px',
    },
    '.post': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        gap: '5px',
    },
    '.post-status': {
        flexDirection: 'row',
        gap: '5px',
    },
}));

export default ListingPageContainer;
