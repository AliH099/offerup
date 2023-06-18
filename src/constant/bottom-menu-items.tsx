import TripOriginIcon from '@mui/icons-material/TripOrigin';
import CommentIcon from '@mui/icons-material/Comment';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SellIcon from '@mui/icons-material/Sell';

const BottomMenuItems = [
    { label: 'خانه', icon: <TripOriginIcon />, url: '/' },
    { label: 'صندوق ورودی', icon: <CommentIcon />, url: '/inbox' },
    { label: 'ایجاد آگهی', icon: <CameraAltIcon />, url: '/wizard' },
    { label: 'فروش', icon: <SellIcon />, url: '/sell' },
];

export default BottomMenuItems;
