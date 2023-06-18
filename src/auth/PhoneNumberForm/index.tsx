import PhoneNumberFormContainer from './styles';
import TextInput from 'inputs/TextInput';
import { Typography } from '@mui/material';
import Transition from 'common/transition';
import { useContext, useState } from 'react';
import { LoginWizardContext } from 'auth/LoginWizardProvider';
import { BlurFade } from 'auth/OtpForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import httpRequest, { catchRequestError } from 'helpers/http-request';

const validationSchema = yup.object({
    phone: yup
        .string()
        .length(11, 'شماره موبایل باید ۱۱ رقمی باشد')
        .matches(/^[09|۰۹][۰۱۲۳۴۵۶۷۸۹0-9]{10}/, 'شماره صحیح نمی باشد')
        .required('لطفا شماره موبایل را وارد نمایید'),
});

const PhoneNumberForm = () => {
    const ctx = useContext(LoginWizardContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { control, handleSubmit } = useForm<{ phone: string }>({
        resolver: yupResolver(validationSchema),
    });

    const sendOtpCode: SubmitHandler<{ phone: string }> = (values) => {
        ctx.setPhoneNumber(values.phone);
        setLoading(true);
        const requestBody = { phone: values.phone };
        httpRequest<Response>('account/send_verification_code/', 'POST', requestBody)
            .then((res) => {
                setError(undefined);
                ctx.setStep('entry-otp-code');
            })
            .catch((err) => {
                setError(err.response?.data?.detail);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Transition
            in={ctx.step === 'entry-number'}
            enterKeyframes={BlurFade.enter}
            exitKeyframes={BlurFade.exit}
            duration={0.3}
            unmountOnExit
        >
            <form onSubmit={handleSubmit(sendOtpCode)}>
                <PhoneNumberFormContainer>
                    <Typography variant="h3">ورود</Typography>
                    <Typography className="description">لطفا شماره خود را وارد کنید</Typography>
                    <TextInput
                        placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                        control={control}
                        name="phone"
                        helperText={error}
                    />
                    <LoadingButton variant="contained" fullWidth type="submit" loading={loading}>
                        مرحله بعد
                    </LoadingButton>
                </PhoneNumberFormContainer>
            </form>
        </Transition>
    );
};

export default PhoneNumberForm;
