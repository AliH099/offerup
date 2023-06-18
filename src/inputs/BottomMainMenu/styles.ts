import { Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const BottomMainMenuContainer = styled(Stack)(() => ({
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px 20px',
    position: 'fixed',
    bottom: 0,
    left: 0,
    backgroundColor: grey[100],
}));

export default BottomMainMenuContainer;
