import { Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const PostContainer = styled(Stack)(() => ({
    borderRadius: '5px',
    overflow: 'hidden',
    width: '30vw',
    height: '30vw',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    '.image': {
        color: grey[500],
        // fontSize: '70px',
        width: '100%',
        height: '100%',
    },
}));

export default PostContainer;
