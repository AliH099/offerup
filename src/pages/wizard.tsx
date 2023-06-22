import { Stack } from '@mui/material';
import { serverSideFetch } from 'helpers/http-request';
import { StepWizardProvider } from 'hooks/useStepWizard';
import { GetServerSidePropsContext } from 'next';
import WizardPageContainer from 'page-containers/WizardPageContainer';
import CreatePost from 'wizard/CreatePost';
import Details from 'wizard/Details';
import { Categories } from 'wizard/Details/types';
import Price from 'wizard/Price';
import { NextPageWithLayout } from './_app';
import EndStep from 'wizard/EndStep';
import { useRouter } from 'next/router';
import { stepsTitle } from 'constant/wizard-steps';
import SectionHeader from 'layout/SectionHeader';

interface WizardPage {
    categories: Categories[];
}

const WizardPage: NextPageWithLayout<WizardPage> = (props) => {
    const steps: { [index: number]: React.ReactNode } = {
        0: <CreatePost />,
        1: <Details categories={props.categories} />,
        2: <Price />,
        3: <EndStep />,
    };
    const router = useRouter();

    return (
        <WizardPageContainer>
            <StepWizardProvider stepsCount={4}>
                {(value) => (
                    <Stack height="100%">
                        <SectionHeader
                            title={stepsTitle[value.step]}
                            onClickBack={() => value.prev()}
                            onCancel={() => router.push('./')}
                            hasCancel={true}
                        />
                        <Stack className="content">{steps[value.step]}</Stack>
                    </Stack>
                )}
            </StepWizardProvider>
        </WizardPageContainer>
    );
};

WizardPage.getLayout = function getLayout(page: React.ReactElement) {
    return page;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const categories = await serverSideFetch<List<Categories>>(context, 'marketplace/category/');

    return {
        props: {
            categories: categories.props.data?.results ? categories.props.data.results : null,
        },
    };
};

export default WizardPage;
