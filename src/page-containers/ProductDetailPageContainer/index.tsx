import { Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const ProductDetailPageContainer = styled(Stack)(() => ({
    position: 'relative',
    paddingBottom: '100px',
    '.content': {
        padding: '20px 15px',
        gap: '10px',
    },
    '.two-phrase': {
        display: 'flex',
        gap: '5px',
    },
    '.link-button': {
        fontSize: '12px',
    },
    '.back-button-container': {
        position: 'absolute',
        top: 5,
        left: 10,
        zIndex: 2,
        height: '100%',
    },
    '.back-button': {
        position: 'sticky',
        top: 0,
        left: 10,
        backgroundColor: grey[100],
        boxShadow: `0px 0px 70px ${grey[700]}`,
    },
}));
export default ProductDetailPageContainer;
