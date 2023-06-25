import { Stack, styled } from '@mui/material';
import TextInput from 'inputs/TextInput';

const PriceFormContainer = styled(Stack)(() => ({
    '.button-container': {
        padding: '10px',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
    },

    '.submit-button': {
        paddingBlock: 5,
        borderRadius: '100px',
    },
}));
export default PriceFormContainer;

export const PriceInput = styled(TextInput)(({ theme }) => ({
    '.MuiInputBase-input': {
        paddingLeft: '14px',
        fontSize: 30,
        textAlign: 'center',
    },
}));
