import { IconButton, Typography } from '@mui/material';
import WizardHeaderContainer from './styles';
import Button from 'inputs/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useStepWizard from 'hooks/useStepWizard';
import { useRouter } from 'next/router';
import { stepsTitle } from 'constant/wizard-steps';

const WizardHeader = () => {
    const wizard = useStepWizard();
    const router = useRouter();

    return (
        <WizardHeaderContainer>
            <IconButton className="arrow" onClick={() => wizard.prev()}>
                <ArrowForwardIcon color="primary" />
            </IconButton>
            <Typography>{stepsTitle[wizard.step]}</Typography>
            <Button className="button" onClick={() => router.push('./')}>
                انصراف
            </Button>
        </WizardHeaderContainer>
    );
};

export default WizardHeader;
