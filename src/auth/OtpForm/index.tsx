import { keyframes } from '@emotion/react';
import { Box, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { LoginWizardContext } from 'auth/LoginWizardProvider';
import Transition from 'common/transition';
import { Fragment, useContext, useEffect, useState } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import OtpInputGroup from 'auth/OtpInputGroup';
import { LoadingButton } from '@mui/lab';
import ResendOTPButton from 'auth/ResendOtpButton';
import LoginOptions from 'auth/LoginOptions';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import httpRequest from 'helpers/http-request';
import { setToken } from 'helpers/auth';
import { decodeJWT } from 'helpers/utils';
import useUserData from 'hooks/useUserData';
import OtpFormContainer from './styles';

// Keyframes for PhoneNumberForm and OtpForm animation
const enter = keyframes`
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const exit = keyframes`
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-50px);
        opacity: 0;
    }
`;

export const BlurFade = {
    enter: enter,
    exit: exit,
};

interface VerifyCodeResponse {
    token: string;
}

interface OtpFormProps {
    setOpenModal: (state: boolean) => void;
    openModal?: boolean;
}

const OtpForm: React.FC<OtpFormProps> = (props) => {
    const ctx = useContext(LoginWizardContext);
    const [loading, setLoading] = useState(false);
    const [otpError, setOtpError] = useState<string | undefined>(undefined);
    const { setUser } = useUserData();

    // Options appear bottom of current component
    const options = [
        {
            label: 'ویرایش شماره همراه',
            icon: <BorderColorIcon />,
            onClick: () => {
                ctx.setStep('entry-number');
            },
        },
    ];

    // Options appear bottom of current component

    const verifyOtpCode = () => {
        if (ctx.otpCode.length < 6) {
            setOtpError('کد باید ۶ رقم باشد');
        } else {
            setLoading(true);
            const requestBody = { phone: ctx.phoneNumber, code: ctx.otpCode };
            httpRequest<VerifyCodeResponse>('account/verify_code/', 'POST', requestBody)
                .then(async (res) => {
                    setToken(res.data.token);
                    setUser(decodeJWT(res.data.token));
                    ctx.onSuccess && ctx.onSuccess();
                    props.setOpenModal(false);
                    ctx.setStep('entry-number');
                })
                .catch((err) => {
                    setOtpError(err.response?.data.detail);
                })
                .finally(() => setLoading(false));
        }
    };

    const onSubmit = (event: React.FormEvent) => {
        console.log('aliiiii');
        event.preventDefault();
        verifyOtpCode();
    };

    // Verify otp when user completes the input
    useEffect(() => {
        if (ctx.otpCode.length === 6) {
            verifyOtpCode();
            setOtpError(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctx.otpCode]);

    // Empty error message and otpInput after step changing
    useEffect(() => {
        if (ctx.step === 'entry-number') {
            setOtpError(undefined);
            ctx.setOtpCode('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ctx.step]);

    return (
        <Transition
            in={ctx.step === 'entry-otp-code'}
            enterKeyframes={BlurFade.enter}
            exitKeyframes={BlurFade.exit}
            duration={0.3}
            unmountOnExit
        >
            <form onSubmit={onSubmit}>
                <OtpFormContainer>
                    <DialogTitle className="title">
                        <LockOpenIcon fontSize="large" />
                        <Typography variant="h3">ورود به پیشما</Typography>
                    </DialogTitle>
                    <DialogContent className="content">
                        <Stack className="top-section">
                            <Typography variant="caption">
                                کد ارسال شده به ( {ctx.phoneNumber} ) را وارد کنید
                            </Typography>
                            <Stack>
                                <Box className="otp-input-section">
                                    <OtpInputGroup error={otpError} />
                                    <Stack className="helper-text-container">
                                        <Typography variant="caption" className="helper-text">
                                            {otpError}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                            <ResendOTPButton openModal={props.openModal} />
                            <LoadingButton
                                variant="contained"
                                loading={loading}
                                className="login-button"
                                type="submit"
                            >
                                ورود
                            </LoadingButton>
                        </Stack>
                        <LoginOptions data={options} />
                    </DialogContent>
                </OtpFormContainer>
            </form>
        </Transition>
    );
};

export default OtpForm;
