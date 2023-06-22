import { Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

const SectionHeaderContainer = styled(Stack)(({}) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    paddingBlock: '10px',
    boxShadow: ' rgba(0, 0, 0, 0.18) 0px 2px 4px',
    top: 0,
    backgroundColor: grey[100],
    zIndex: 10,

    '.arrow': {
        position: 'absolute',
        left: 0,
    },
    '.button': {
        position: 'absolute',
        right: 0,
    },
}));

export default SectionHeaderContainer;
