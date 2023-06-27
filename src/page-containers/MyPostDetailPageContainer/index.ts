import { Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const MyPostDetailPageContainer = styled(Stack)(({ theme }) => ({
    position: 'relative',
    paddingBottom: '100px',
    '.content': {
        padding: '20px 15px',
        gap: '10px',
    },
    '.two-phrase': {
        display: 'flex',
        gap: '5px',
    },
    '.link-button': {
        fontSize: '12px',
    },
    '.back-button-container': {
        position: 'absolute',
        top: 5,
        left: 10,
        zIndex: 2,
        height: '100%',
    },
    '.back-button-link': {
        position: 'sticky',
        top: 0,
        left: 10,
    },
    '.back-button': {
        backgroundColor: grey[100],
        boxShadow: `0px 0px 70px ${grey[700]}`,
    },
    '.metadata-label': {
        border: `1px solid ${grey[400]}`,
        borderRadius: '10px',
        width: '48%',
        color: grey[400],
        padding: '20px 0',
        textAlign: 'center',
    },
    '.metadata-value': {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '10px',
        width: '48%',
        textAlign: 'center',
        padding: '20px 0',
    },
}));

export default MyPostDetailPageContainer;
