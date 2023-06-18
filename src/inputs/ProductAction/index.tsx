import Button from 'inputs/Button';
import ProductActionContainer from './styles';

const ProductAction = () => {
    return (
        <ProductActionContainer>
            <Button fullradius={1} variant="outlined" fullWidth>
                درخواست
            </Button>
            <Button fullradius={1} fullWidth variant="contained">
                ارائه پیشنهاد
            </Button>
        </ProductActionContainer>
    );
};

export default ProductAction;
