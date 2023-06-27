import * as React from 'react';
import LoginHeaderContainer from './styles';
import { Typography } from '@mui/material';

interface LoginHeaderProps {}

const LoginHeader: React.FunctionComponent<LoginHeaderProps> = (props) => {
    return (
        <LoginHeaderContainer>
            <Typography variant="h3" color="primary">
                پیشما
            </Typography>
        </LoginHeaderContainer>
    );
};

export default LoginHeader;
