import { Dispatch, SetStateAction } from 'react';
import LoginWizardProvider from 'auth/LoginWizardProvider';
import PhoneNumberForm from 'auth/PhoneNumberForm';
import { Stack } from '@mui/material';
import OtpForm from 'auth/OtpForm';
import FullScreenDrawer from 'data-display/FullScreenDrawer';

interface LoginModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onSuccess?: () => void;
}

const LoginDrawer: React.FC<LoginModalProps> = (props) => {
    return (
        <LoginWizardProvider onSuccess={() => {}}>
            <FullScreenDrawer open={props.open} setOpen={props.setOpen}>
                <Stack position="relative" width="100%">
                    <PhoneNumberForm />
                    <OtpForm setOpenModal={props.setOpen} openModal={props.open} />
                </Stack>
            </FullScreenDrawer>
        </LoginWizardProvider>
    );
};

export default LoginDrawer;
