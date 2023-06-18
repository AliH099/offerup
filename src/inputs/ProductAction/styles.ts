import { Stack, styled } from '@mui/material';

const ProductActionContainer = styled(Stack)(({}) => ({
    flexDirection: 'row',
    gap: '10px',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '5px 10px',
    backgroundColor: 'white',
}));

export default ProductActionContainer;
