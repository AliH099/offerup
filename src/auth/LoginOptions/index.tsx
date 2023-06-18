import { Box, Divider, Stack, Typography } from '@mui/material';
import LoginOptionsContainer from './styles';

interface LoginOptionsProps {
    data: {
        label: string;
        icon: React.ReactNode;
        onClick: () => void;
    }[];
}

const LoginOptions: React.FC<LoginOptionsProps> = (props) => {
    return (
        <LoginOptionsContainer>
            {props.data.map((item, index) => {
                return (
                    <Stack key={index} gap="18px">
                        <Divider className="divider" />
                        <Typography className="text" onClick={item.onClick} variant="body2">
                            {item.icon}
                            {item.label}
                        </Typography>
                    </Stack>
                );
            })}
        </LoginOptionsContainer>
    );
};

export default LoginOptions;
