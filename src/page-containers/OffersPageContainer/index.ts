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
    '.offer': {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        ':active': {
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.main,
        },
    },
    '.offer-info': {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

export default OffersPageContainer;
