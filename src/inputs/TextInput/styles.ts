import { FormControl, FormControlProps, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/system';

const TextInputContainer = styled(FormControl)<FormControlProps>(({ theme }) => ({
    '.MuiInputBase-formControl': {
        marginTop: '19px',
        borderRadius: 15,
        position: 'relative',
        backgroundColor: theme.palette.background.main,
        border: `1px solid ${theme.palette.primary[500]}`,
        fontSize: 16,
        padding: '7px 12px',
        boxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        WebkitBoxSizing: 'border-box',
        ':hover': {
            borderColor: 'black',
        },
        '&:has(input:focus)': {
            border: '1px solid transparent',
            boxShadow: `0px 0px 0px 2px ${theme.palette.primary.main}`,
        },
    },
    '.MuiSvgIcon-root': {
        color: theme.palette.primary.main,
    },
    '.MuiInputBase-input:-webkit-autofill': {
        transition: 'all 0s 50000s',
        WebkitTextFillColor: 'black',
        fontFamily: 'iranYekan',
    },
    '.MuiInputBase-input': {
        paddingLeft: '14px',
    },
    '.Mui-disabled': {
        borderColor: grey[300],
        borderRadius: '5px',
        ':hover': {
            borderColor: theme.palette.grey[300],
            borderWidth: '1px',
        },
    },
    '.label': {
        color: theme.palette.primary.main,
    },
    '.helper-text': {
        color: theme.palette.error.main,
        height: '25px',
    },
}));

export default TextInputContainer;

export const PureTextInput = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
        color: theme.palette.primary.main,
        boxShadow: 'none',
    },
    // '& .MuiInput-underline:after': {
    //     borderBottomColor: theme.palette.primary.main,
    // },
    '& .MuiOutlinedInput-root': {
        borderRadius: '15px',
        '& fieldset': {
            borderColor: theme.palette.primary[500],
        },
        '&:hover fieldset': {
            borderColor: 'black',
        },
        '& .MuiInputBase-input:-webkit-autofill': {
            borderRadius: '15px',
            WebkitTextFillColor: 'black',
            WebkitBoxShadow: '0 0 0 1000px white inset',
        },
    },
    // input: {
    //     height: '35px',
    //     marginLeft: '10px',
    // },
    '& .Mui-focused': {
        // transition: theme.transitions.create(['border-color', 'box-shadow'], { duration: 0.7 }),
        // borderRadius: '15px',
        // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 5px 0.2rem`,
        // borderColor: theme.palette.primary.main,
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
    '& .Mui-disabled': {
        '&:hover fieldset': {
            borderColor: theme.palette.grey[400],
            borderWidth: '1px',
        },
    },
}));
