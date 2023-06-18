import { LoginWizardContext } from 'auth/LoginWizardProvider';
import { useContext } from 'react';
import OTPInput from 'react-otp-input';
import theme from 'theme';

interface OtpInputGroup {
    error?: string;
}

const OtpInputGroup: React.FC<OtpInputGroup> = (props) => {
    const ctx = useContext(LoginWizardContext);

    const handleChange = (otp: string) => {
        ctx.setOtpCode(otp);
    };

    return (
        <OTPInput
            renderInput={(props) => <input {...props} />}
            shouldAutoFocus
            numInputs={6}
            onChange={handleChange}
            value={ctx.otpCode}
            inputStyle={{
                width: '40px',
                height: '40px',
                border: '1px solid',
                borderColor: props.error ? theme.palette.error.main : theme.palette.grey[400],
                borderRadius: '10px',
                fontFamily: 'iranYekan',
                color: 'black',
                backgroundColor: 'white',
            }}
            containerStyle={{
                gap: '6px',
                justifyContent: 'center',
            }}
        />
    );
};

export default OtpInputGroup;
