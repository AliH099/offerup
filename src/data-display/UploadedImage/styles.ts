import { IconButton, Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const UploadedImageContainer = styled(Stack)(({ theme }) => ({
    position: 'relative',
    '.progress-bar': {
        position: 'absolute',
        top: '50%',
        left: '60px',
        width: '50px',
    },
    '.circular-progress': {
        position: 'absolute',
        top: -7,
        left: -7,
    },
    '.remove-icon': { fontSize: '20px' },
    '.cancel': {
        // fontSize: '30px',
        position: 'absolute',
        top: '60%',
        left: '53px',
        zIndex: 10,
        cursor: 'pointer',
        paddingBlock: '0px',
    },
}));

export default UploadedImageContainer;

export const RemoveButton = styled(IconButton)(({ disabled, theme }) => ({
    position: 'absolute',
    top: -7,
    left: -7,
    zIndex: 10,
    backgroundColor: theme.palette.error.main,
    color: grey[100],
    padding: 3,
    '&.Mui-disabled': {
        backgroundColor: grey[500],
        color: 'white',
    },
}));
