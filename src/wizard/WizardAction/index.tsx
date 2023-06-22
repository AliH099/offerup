import WizardActionContainer from './styles';
import CustomizedStepper from 'wizard/CustomizedStepper';
import useStepWizard from 'hooks/useStepWizard';
import { steps } from 'constant/wizard-steps';
import { LoadingButton } from '@mui/lab';

interface WizardActionProps {
    buttonText?: string;
    onClick?: () => void;
    loading?: boolean;
}

const WizardAction: React.FC<WizardActionProps> = (props) => {
    const wizard = useStepWizard();
    return (
        <WizardActionContainer>
            <CustomizedStepper steps={steps} activeStep={wizard.step} />
            <LoadingButton
                variant="contained"
                className="button"
                type="submit"
                onClick={props.onClick}
                loading={props.loading}
            >
                {props.buttonText || 'مرحله بعد'}
            </LoadingButton>
        </WizardActionContainer>
    );
};

export default WizardAction;
