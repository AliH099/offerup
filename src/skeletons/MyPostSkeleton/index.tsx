import Skeleton from 'skeletons/Skeleton';
import MyPostSkeletonContainer from './styles';

const MyPostSkeleton = () => {
    return (
        <MyPostSkeletonContainer padding="10px" gap="5px" alignItems="center">
            <Skeleton width={100} height={100} className="image" />
            <Skeleton width={200} height={10} />
            <Skeleton width={200} height={10} />
            <Skeleton width={150} height={10} />
            <Skeleton width={120} height={30} className="button" />
            <Skeleton width={120} height={30} />
        </MyPostSkeletonContainer>
    );
};

export default MyPostSkeleton;
