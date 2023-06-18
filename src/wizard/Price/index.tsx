import { Stack } from '@mui/material';
import PriceContainer, { PriceInput } from './styles';

const Price = () => {
    return (
        <PriceContainer>
            <PriceInput type="number" endAdornment={'ریال'} />
        </PriceContainer>
    );
};

export default Price;
