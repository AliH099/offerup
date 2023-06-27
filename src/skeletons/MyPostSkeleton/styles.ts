import { Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const MyPostSkeletonContainer = styled(Stack)(() => ({
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    gap: '10px',
    border: `1px solid ${grey[300]}`,
    borderRadius: '10px',
    '.button': {
        marginTop: '10px',
    },
    '.image': {
        marginBottom: '10px',
    },
}));

export default MyPostSkeletonContainer;
