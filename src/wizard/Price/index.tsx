import { Stack } from '@mui/material';
import PriceContainer, { PriceInput } from './styles';
import { useForm } from 'react-hook-form';

const Price = () => {
    const { control, handleSubmit, watch } = useForm();
    return (
        <PriceContainer>
            <PriceInput type="number" endAdornment={'ریال'} control={control} name="price" />
        </PriceContainer>
    );
};

export default Price;
