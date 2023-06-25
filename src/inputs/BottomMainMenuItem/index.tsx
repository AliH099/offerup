import { Typography } from '@mui/material';
import BottomMainMenuItemContainer from './styles';

interface BottomMainMenuItemProps {
    label: string;
    icon: React.ReactElement;
    active?: boolean;
}

const BottomMainMenuItem: React.FC<BottomMainMenuItemProps> = (props) => {
    return (
        <BottomMainMenuItemContainer active={props.active ? +props.active : undefined}>
            {props.icon}
            <Typography variant="body2">{props.label}</Typography>
        </BottomMainMenuItemContainer>
    );
};

export default BottomMainMenuItem;
