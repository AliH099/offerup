import { LoadingButton } from '@mui/lab';
import { LoginWizardContext } from 'auth/LoginWizardProvider';
import httpRequest, { catchRequestError } from 'helpers/http-request';
import { useContext, useEffect, useState } from 'react';

interface ResendOTPButtonProps {
    openModal?: boolean;
}

const ResendOTPButton: React.FC<ResendOTPButtonProps> = (props) => {
    const ctx = useContext(LoginWizardContext);
    const [seconds, setSeconds] = useState<number>(120);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let interval: any = null;
        if (seconds == 0) {
            setSeconds(0);
            clearInterval(interval);
            if (!props.openModal) {
                ctx.setStep('entry-number');
                ctx.setOtpCode('');
            }
        } else {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds]);

    useEffect(() => {
        if (!props.openModal && seconds == 0) {
            ctx.setStep('entry-number');
            ctx.setOtpCode('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.openModal]);

    const showTimer = () => {
        const min: string = ('0' + Math.floor(seconds / 60).toString()).slice(-2);
        const sec: string = ('0' + (seconds % 60).toString()).slice(-2);
        return min + ':' + sec;
    };

    const sendOtpCode = () => {
        setLoading(true);
        const requestBody = { phone: ctx.phoneNumber };

        httpRequest<Response>('account/send_verification_code/', 'POST', requestBody)
            .then((res) => {
                setSeconds(120);
            })
            .catch((err) => {
                catchRequestError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <LoadingButton
            style={{ borderRadius: '12px' }}
            loading={loading}
            variant="outlined"
            disabled={seconds !== 0}
            onClick={sendOtpCode}
        >
            {seconds === 0 ? 'ارسال مجدد کد فعالسازی' : showTimer()}
        </LoadingButton>
    );
};

export default ResendOTPButton;
