import { Typography } from '@mui/material';
import EndStepContainer from './styles';
import WizardAction from 'wizard/WizardAction';
import httpRequest from 'helpers/http-request';
import { useState } from 'react';
import useWizardStore from 'store/wizard';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const EndStep = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { images, price, mainData, metadata } = useWizardStore();
    const router = useRouter();

    const registerPost = () => {
        const requestBody = { ...mainData, images: ['www.google.com'], metadata, price };
        setLoading(true);
        httpRequest<Response>('marketplace/post/', 'POST', requestBody)
            .then((res) => {
                toast.success('برو صفا کن');
                router.push('./');
            })
            .catch((err) => {})
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <EndStepContainer>
            <Typography>جهت ثبت آگهی بر روی دکمه پایان بزنید</Typography>
            <WizardAction buttonText="پایان" onClick={registerPost} loading={loading} />
        </EndStepContainer>
    );
};

export default EndStep;
