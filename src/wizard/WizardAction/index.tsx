import Button from 'inputs/Button';
import WizardActionContainer from './styles';
import CustomizedStepper from 'wizard/CustomizedStepper';
import useStepWizard from 'hooks/useStepWizard';
import { useState } from 'react';
import { steps } from 'constant/wizard-steps';

const WizardAction = () => {
    const wizard = useStepWizard();
    return (
        <WizardActionContainer>
            <CustomizedStepper steps={steps} activeStep={wizard.step} />
            <Button
                variant="contained"
                fullradius={1}
                className="button"
                type="submit"
                // onClick={() => wizard.next()}
            >
                مرحله بعد
            </Button>
        </WizardActionContainer>
    );
};

export default WizardAction;
