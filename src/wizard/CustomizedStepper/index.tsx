import { Stack, Typography } from '@mui/material';
import CustomizedStepperContainer, { Step } from './styles';

interface CustomizedStepperProps {
    steps: string[];
    activeStep: number;
}

const CustomizedStepper: React.FC<CustomizedStepperProps> = (props) => {
    return (
        <CustomizedStepperContainer>
            {props.steps.map((item, index) => (
                <Step key={index} active={+(index <= props.activeStep)}>
                    <div className="rectanguler" />
                    <Typography className="label" variant="body2">
                        {item}
                    </Typography>
                </Step>
            ))}
        </CustomizedStepperContainer>
    );
};

export default CustomizedStepper;
