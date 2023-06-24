import { Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const CreatePostContainer = styled(Stack)(({ theme }) => ({
    gap: '10px',
    '.images-container': {
        paddingTop: '50px',
        flexDirection: 'row',
        overflowX: 'auto',
        gap: '10px',
        position: 'relative',
        '.image': {
            objectFit: 'cover',
        },
    },

    '.add-photo': {
        marginInline: 'auto',
        border: '1px solid',
        borderColor: grey[500],
        minWidth: '170px',
        height: '170px',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: '10px',
        '.text': {
            marginBottom: '10px',
            color: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
        },
    },
    '.plus': {
        fontSize: '70px',
        color: theme.palette.primary.main,
    },
    '.cover-help': {
        alignSelf: 'center',
        lineHeight: 'normal',
    },
    '.button': {
        paddingBlock: '7px',
    },
}));

export default CreatePostContainer;
