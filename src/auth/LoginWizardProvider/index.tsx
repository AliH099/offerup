import React, { useState } from 'react';

interface LoginWizardProviderProps {
    // Below schema is for use context values in scope provider defined directly
    children: React.ReactNode;

    onSuccess?: () => void;
}

type LoginWizardStep = 'entry-number' | 'entry-otp-code';

export type LoginContextType = {
    step: LoginWizardStep;
    phoneNumber: string;
    otpCode: string;
    setStep: React.Dispatch<React.SetStateAction<LoginWizardStep>>;
    setOtpCode: React.Dispatch<React.SetStateAction<string>>;
    setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
    onSuccess?: () => void;
};

export const LoginWizardContext = React.createContext<LoginContextType>({
    step: 'entry-number',
    phoneNumber: '',
    otpCode: '',
    setStep: () => {},
    setOtpCode: () => {},
    setPhoneNumber: () => {},
    onSuccess: () => {},
});

const LoginWizardProvider: React.FC<LoginWizardProviderProps> = (props) => {
    const [step, setStep] = useState<LoginWizardStep>('entry-number');
    const [otpCode, setOtpCode] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const values: LoginContextType = {
        step: step,
        phoneNumber: phoneNumber,
        otpCode: otpCode,
        setStep: setStep,
        setOtpCode: setOtpCode,
        setPhoneNumber: setPhoneNumber,
        onSuccess: props.onSuccess,
    };

    return (
        <LoginWizardContext.Provider value={values}>{props.children}</LoginWizardContext.Provider>
    );
};

export default LoginWizardProvider;
