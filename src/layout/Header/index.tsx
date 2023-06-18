import { IconButton, SwipeableDrawer, Typography } from '@mui/material';
import HeaderContainer from './styles';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginModal from 'auth/LoginModal';
import useUserData from 'hooks/useUserData';
import LoginButton from 'auth/LoginButton';

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const { data: userData } = useUserData();

    return (
        <HeaderContainer>
            <LoginModal open={open} setOpen={setOpen} />
            <IconButton color="primary" onClick={() => setOpenDrawer(true)} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography className="title" variant="h3">
                پیشما
            </Typography>
            <LoginButton />
            <SwipeableDrawer
                open={openDrawer}
                dir="rtl"
                onClose={() => setOpenDrawer(false)}
                PaperProps={{
                    sx: {
                        width: '250px',
                        pb: '80px',
                    },
                }}
                onOpen={() => {}}
            ></SwipeableDrawer>
        </HeaderContainer>
    );
};

export default Header;
