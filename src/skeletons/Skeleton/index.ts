import { Skeleton as MuiSkeleton, styled } from '@mui/material';

const Skeleton = styled(MuiSkeleton)(() => ({
    borderRadius: '5px',
}));

Skeleton.defaultProps = {
    animation: 'wave',
    variant: 'rectangular',
};

export default Skeleton;
