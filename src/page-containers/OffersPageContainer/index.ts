import { Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const OffersPageContainer = styled(Stack)(({ theme }) => ({
    gap: '10px',
    '.content': {
        padding: '20px',
        gap: '10px',
    },
    '.post-info': {
        padding: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
}));

export default OffersPageContainer;
