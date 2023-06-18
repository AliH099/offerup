import { Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const HeaderContainer = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: grey[100],
    '.title': {
        color: theme.palette.primary.main,
    },
    '.login-button': {
        paddingBlock: '5px',
    },
}));

export default HeaderContainer;
