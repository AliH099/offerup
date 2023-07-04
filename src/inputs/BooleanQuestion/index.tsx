import { useEffect, useState } from 'react';
import BooleanQuestionContainer from './styles';
import { Button, Stack, Typography } from '@mui/material';

interface BooleanQuestionProps {
    question: string;
    trueLabel?: string;
    falseLabel?: string;
    value?: boolean;
    onChange: (state: boolean) => void;
}

const BooleanQuestion: React.FunctionComponent<BooleanQuestionProps> = (props) => {
    const [value, setValue] = useState<boolean | undefined>(props.value);

    useEffect(() => {
        value !== undefined && props.onChange(value);
    }, [value]);

    return (
        <BooleanQuestionContainer>
            <Typography variant="body1">{props.question}</Typography>
            <Stack direction="row" gap="10px">
                <Button
                    variant={value === true ? 'contained' : 'outlined'}
                    fullWidth
                    onClick={() => setValue(true)}
                >
                    {props.trueLabel}
                </Button>
                <Button
                    variant={value === false ? 'contained' : 'outlined'}
                    fullWidth
                    onClick={() => setValue(false)}
                >
                    {props.falseLabel}
                </Button>
            </Stack>
        </BooleanQuestionContainer>
    );
};

BooleanQuestion.defaultProps = {
    trueLabel: 'بله',
    falseLabel: 'خیر',
};

export default BooleanQuestion;
