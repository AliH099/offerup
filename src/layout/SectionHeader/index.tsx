import { IconButton, Typography } from '@mui/material';
import Button from 'inputs/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { SectionHeaderProps } from './types';
import SectionHeaderContainer from './styles';

const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
    return (
        <SectionHeaderContainer>
            <IconButton className="arrow" onClick={props.onClickBack}>
                <ArrowForwardIcon color="primary" />
            </IconButton>
            <Typography>{props.title}</Typography>
            {props.hasCancel && (
                <Button className="button" onClick={props.onCancel}>
                    انصراف
                </Button>
            )}
        </SectionHeaderContainer>
    );
};

export default SectionHeader;
