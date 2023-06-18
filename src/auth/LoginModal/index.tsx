import { Dispatch, SetStateAction } from 'react';
import LoginDrawer from './styles';
import CloseIcon from '@mui/icons-material/Close';
import LoginWizardProvider from 'auth/LoginWizardProvider';
import PhoneNumberForm from 'auth/PhoneNumberForm';
import { Stack } from '@mui/material';
import OtpForm from 'auth/OtpForm';

interface LoginModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onSuccess?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = (props) => {
    return (
        <LoginWizardProvider onSuccess={() => {}}>
            <LoginDrawer
                disableSwipeToOpen
                open={props.open}
                onClose={() => props.setOpen(false)}
                onOpen={() => {}}
                anchor="bottom"
                dir="rtl"
                PaperProps={{
                    sx: {
                        borderRadius: '15px 15px 0px 0px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        padding: '20px',
                        gap: '10px',
                    },
                }}
            >
                <CloseIcon onClick={() => props.setOpen(false)} className="close-icon" />
                <Stack position="relative" width="100%">
                    <PhoneNumberForm />
                    <OtpForm setOpenModal={props.setOpen} openModal={props.open} />
                </Stack>
            </LoginDrawer>
        </LoginWizardProvider>
    );
};

export default LoginModal;
