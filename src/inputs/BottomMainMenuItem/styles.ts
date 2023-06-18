import { Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const BottomMainMenuItemContainer = styled(Stack)<{ active?: number }>(({ active, theme }) => ({
    alignItems: 'center',
    color: active ? theme.palette.primary.main : grey[700],
}));

export default BottomMainMenuItemContainer;
