import BottomMainMenuItem from 'inputs/BottomMainMenuItem';
import BottomMainMenuContainer from './styles';
import BottomMenuItems from 'constant/bottom-menu-items';
import { useRouter } from 'next/router';
import Link from 'next/link';

const BottomMainMenu = () => {
    const router = useRouter();

    return (
        <BottomMainMenuContainer>
            {BottomMenuItems.map((item, index) => (
                <Link href={item.url} key={index}>
                    <BottomMainMenuItem {...item} active={router.pathname.includes(item.url)} />
                </Link>
            ))}
        </BottomMainMenuContainer>
    );
};

export default BottomMainMenu;
