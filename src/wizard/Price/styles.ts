import { Stack, styled } from '@mui/material';
import TextInput from 'inputs/TextInput';

const PriceContainer = styled(Stack)(() => ({
    '.price-box': {
        border: '1px solid red',
    },
}));

export default PriceContainer;

export const PriceInput = styled(TextInput)(({ theme }) => ({
    '.MuiInputBase-input': {
        paddingLeft: '14px',
        fontSize: 30,
        textAlign: 'center',
    },
}));
