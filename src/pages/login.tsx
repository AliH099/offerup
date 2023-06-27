import { Stack } from '@mui/material';
import { NextPageWithLayout } from './_app';
import { useRouter } from 'next/router';
import LoginPageContainer from 'page-containers/LoginPageContainer';
import PhoneNumberForm from 'auth/PhoneNumberForm';
import OtpForm from 'auth/OtpForm';
import LoginWizardProvider from 'auth/LoginWizardProvider';
import { Fragment } from 'react';
import LoginHeader from 'layout/LoginHeader';
import useUserData from 'hooks/useUserData';

interface LoginPageProps {}

const LoginPage: NextPageWithLayout<LoginPageProps> = (props) => {
    const router = useRouter();
    const { data: userData, ready } = useUserData();

    return (
        <LoginPageContainer>
            <LoginWizardProvider
                onSuccess={() => {
                    router.push('./');
                }}
            >
                <Stack position="relative" width="100%">
                    {!userData?.user_id && <PhoneNumberForm />}
                    <OtpForm setOpenModal={() => {}} openModal={false} />
                </Stack>
            </LoginWizardProvider>
        </LoginPageContainer>
    );
};

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <Fragment>
            <LoginHeader />
            {page}
        </Fragment>
    );
};

export default LoginPage;
