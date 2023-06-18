import { Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const CustomizedStepperContainer = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export default CustomizedStepperContainer;

export const Step = styled(Stack)<{ active?: number }>(({ theme, active }) => ({
    gap: '7 px',
    alignItems: 'center',
    '.rectanguler': {
        width: '22.5vw',
        height: '5px',
        backgroundColor: active ? theme.palette.primary.main : grey[500],
        borderRadius: '10px',
    },
    '.label': {
        color: active ? theme.palette.primary.main : grey[500],
    },
}));
