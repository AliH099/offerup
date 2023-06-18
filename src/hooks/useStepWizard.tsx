import React, { useContext, useState } from 'react';

interface StepWizardState {
    step: number;
    next: () => void;
    prev: () => void;
    reset: () => void;
    jump: (step: number) => void;
}

interface StepWizardProviderProps {
    stepsCount: number;
    children: (props: StepWizardState) => React.ReactNode;
}

const StepWizardContext = React.createContext<StepWizardState>({
    step: 0,
    next: () => {},
    prev: () => {},
    reset: () => {},
    jump: () => {},
});

export const StepWizardProvider: React.FC<StepWizardProviderProps> = (props) => {
    const [step, setStep] = useState<number>(0);

    const next = () => {
        if (step < props.stepsCount - 1) {
            setStep((prev) => prev + 1);
        }
    };

    const prev = () => {
        if (step > 0) {
            setStep((prev) => prev - 1);
        }
    };

    const jump = (step: number) => setStep(step);

    const reset = () => setStep(0);

    const context = { next, prev, jump, reset, step };

    return (
        <StepWizardContext.Provider value={context}>
            {props.children(context)}
        </StepWizardContext.Provider>
    );
};

const useStepWizard = () => {
    const data = useContext(StepWizardContext);
    return { ...data };
};

export default useStepWizard;
