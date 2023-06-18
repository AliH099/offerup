import Header from 'layout/Header';
import SiteLayoutContainer from './styles';

interface SiteLayoutProps {
    children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = (props) => {
    return (
        <SiteLayoutContainer>
            <Header />
            {props.children}
        </SiteLayoutContainer>
    );
};

export default SiteLayout;
