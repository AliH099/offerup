import { styled } from '@mui/system';
import { Button as MuiButton, ButtonProps } from '@mui/material';

const Button = styled(MuiButton)<
    ButtonProps & { component?: React.ElementType; fullradius?: number }
>(({ fullradius }) => ({
    minWidth: 'fit-content',
    borderRadius: fullradius ? '100px' : '15px',
    padding: '10px 24px',
    gap: '14px',
}));

export default Button;
