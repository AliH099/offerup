import { Stack, Typography } from '@mui/material';
import calcInterval from 'helpers/calc-interval';
import { OfferDetails } from 'page-containers/OffersPageContainer/types';
import ReceivedOfferContainer from './styles';

interface ReceivedOfferProps extends OfferDetails {
    onClick: (offerId: number, proposingUser: string) => void;
}

const ReceivedOffer: React.FunctionComponent<ReceivedOfferProps> = (props) => {
    const {
        proposing_user__first_name: firstName,
        proposing_user__last_name: lastName,
        created_at,
        price,
        id,
        onClick,
    } = props;

    return (
        <ReceivedOfferContainer
            onClick={() => onClick(id, firstName + lastName)}
            variant="outlined"
        >
            <Stack className="offer-info">
                <Stack>
                    <Typography variant="body2">{firstName + lastName + 'ali'}</Typography>
                    <Typography variant="body2">{calcInterval(created_at)}</Typography>
                </Stack>
                <Typography variant="h6">
                    {price.toLocaleString()}
                    <span className="price-unit"> تومان</span>
                </Typography>
            </Stack>
        </ReceivedOfferContainer>
    );
};

export default ReceivedOffer;
