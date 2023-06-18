import { createTheme } from '@mui/material';
import { faIR } from '@mui/material/locale';

const theme = createTheme(
    {
        direction: 'rtl',
        palette: {
            primary: {
                main: '#0160A7',
                light: '#DCEBF5',
                '500': '#7DB9DE',
            },
            secondary: {
                main: '#F5AF00',
                '600': '#D9B265',
            },
        },
        typography: {
            fontFamily: 'iranYekan',
            h1: {
                fontSize: '45px',
                fontWeight: 900,
            },
            h2: {
                fontSize: '36px',
                fontWeight: 400,
            },
            h3: {
                fontSize: '28px',
                fontWeight: 800,
            },
            h4: {
                fontSize: '20px',
                fontWeight: 800,
            },
            h5: {
                fontSize: '20px',
                fontWeight: 700,
            },
            body1: {
                fontSize: '16px',
                fontWeight: 400,
            },
            body2: {
                fontSize: '14px',
                fontWeight: 400,
            },
            caption: {
                fontSize: '12px',
                fontWeight: 400,
            },
            subtitle1: {
                fontSize: '10px',
                fontWeight: 400,
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundImage:
                            'linear-gradient(180deg, #FAFBFB 0%, #FCFEFE 48.44%, #FAFAFA 100%)',
                    },
                },
            },
            MuiButton: {
                defaultProps: {
                    disableTouchRipple: true,
                    disableFocusRipple: true,
                },
            },
            MuiIconButton: {
                defaultProps: {
                    disableTouchRipple: true,
                    disableFocusRipple: true,
                },
            },
            MuiChip: {
                styleOverrides: {
                    filled: {
                        background: '#F5AF00',
                        color: '#0160A7',
                    },
                },
            },
        },
    },
    faIR,
);

export default theme;
