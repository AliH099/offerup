import { Button, ButtonProps, Fade, Paper, Popper, Stack, Typography } from '@mui/material';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import useUserData from 'hooks/useUserData';
import LoginIcon from '@mui/icons-material/Login';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { useRouter } from 'next/router';
import { getToken, removeToken } from 'helpers/auth';
import LoginModal from 'auth/LoginModal';
import LoginButtonContainer from './styles';

const LoginButton: React.FC<ButtonProps> = (props) => {
    const router = useRouter();
    const { reset } = useUserData();
    const [open, setOpen] = useState<boolean>(false);
    const { data: userData, ready } = useUserData();
    const [openPopper, setOpenPopper] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const popperRef = useRef<HTMLDivElement>(null);
    const canBeOpen = openPopper && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    const handlePopper = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpenPopper(true);
    };

    useOnClickOutside(popperRef, () => setOpenPopper(false), 'mouseup');

    const handleLogin = () => {
        setOpen(true);
    };

    useEffect(() => {
        setOpenPopper(false);
    }, [router.pathname]);

    const signout = () => {
        setOpenPopper(false);
        setTimeout(() => {
            removeToken();
            reset();
            router.push('/');
        }, 500);
    };

    return (
        <Fragment>
            {getToken() === null && <LoginModal open={open} setOpen={setOpen} />}
            {ready === true && userData?.user_id ? (
                <Stack onClick={handlePopper}>
                    <Button sx={{ position: 'relative' }} variant="contained">
                        <Typography variant="caption">حساب کاربری</Typography>
                    </Button>
                </Stack>
            ) : (
                <Button onClick={handleLogin} variant="contained">
                    <LoginIcon />
                    <Typography variant="caption">ورود</Typography>
                </Button>
            )}
            <Popper id={id} open={openPopper} anchorEl={anchorEl} transition placement="bottom-end">
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps}>
                        <LoginButtonContainer>
                            <Paper ref={popperRef} elevation={4} className="paper">
                                <Typography
                                    onClick={signout}
                                    variant="caption"
                                    className="log-out-option"
                                >
                                    خروج از حساب کاربری
                                </Typography>
                            </Paper>
                        </LoginButtonContainer>
                    </Fade>
                )}
            </Popper>
        </Fragment>
    );
};

export default LoginButton;
