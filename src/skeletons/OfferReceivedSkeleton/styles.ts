import { Paper, styled } from '@mui/material';

const OfferListSkeletonContainer = styled(Paper)(() => ({
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export default OfferListSkeletonContainer;
