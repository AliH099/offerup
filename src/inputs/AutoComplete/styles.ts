import { Autocomplete as MuiAutocomplete, TextField, styled } from '@mui/material';

const Autocomplete = styled(MuiAutocomplete)(
    ({ theme }) => `
    input {
        ::placeholder, :-ms-input-placeholder, ::-ms-input-placeholder {
            color: #4897E9 !important;
        }
    }
`,
);

export default Autocomplete;

export const Input = styled(TextField)(({ theme, color, size }) => {
    const themeColor = theme.palette[color || 'info'][color === 'primary' ? 'dark' : 'main'];
    return `
        ${
            size === 'small' &&
            `   .MuiOutlinedInput-root {
                    padding: 5px 10px 5px 0px;
                    > :first-of-type {
                        .MuiIconButton-root {
                            margin-inline: -2px 6px;
                        }
                        svg {
                            color: #73777F;
                            font-size: 16px;
                        }
                    }
                    > :nth-last-of-type (2) svg {
                        color: ${themeColor};
                    }
                    .MuiInputBase-input:-webkit-autofill {
                        transition: all 0s 50000s;
                        -webkit-text-fill-color: ${themeColor};
                    }
                }
            `
        }
        input {
            height: 10px;
            font-size: 14px;
            padding: 8.5px 14px !important;
        }
        label {
            margin-bottom: 20px;
        }
         legend {
            padding-inline: 20px 5px;
        }
         label {
            color: ${themeColor} !important;
        }
        fieldset {
            border-radius: 0;
            border-top: none;
            border-left: none;
            border-right:none;
            border-bottom-width: 1px !important;
            border-color: ${themeColor} !important;
        }
        .MuiFormHelperText-root {
            color: ${theme.palette.error.main};
        }
    `;
});
