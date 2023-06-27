import { Stack } from '@mui/material';
import OfferListSkeletonContainer from './styles';
import Skeleton from 'skeletons/Skeleton';

const OfferReceivedSkeleton = () => {
    return (
        <OfferListSkeletonContainer variant="outlined">
            <Stack gap="10px">
                <Skeleton width={150} height={10} />
                <Skeleton width={150} height={10} />
            </Stack>
            <Skeleton width={100} height={20} />
        </OfferListSkeletonContainer>
    );
};

export default OfferReceivedSkeleton;
