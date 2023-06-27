import { Paper, styled } from '@mui/material';

const ReceivedOfferContainer = styled(Paper)(({ theme }) => ({
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    ':active': {
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
    },
    '.price-unit': {
        fontSize: '10px',
    },
    '.offer-info': {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

export default ReceivedOfferContainer;
