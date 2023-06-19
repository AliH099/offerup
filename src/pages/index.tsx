import BottomMainMenu from 'inputs/BottomMainMenu';
import TextInput from 'inputs/TextInput';
import SiteLayout from 'layout/SiteLayout';
import HomePageContainer from 'page-containers/HomePageContainer';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Stack } from '@mui/material';
import Post from 'data-display/Post';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { serverSideFetch } from 'helpers/http-request';
import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from './_app';

interface HomeProps {
    posts: Post[];
}

const Home: NextPageWithLayout<HomeProps> = (props) => {
    const { control, handleSubmit } = useForm<{ search: string }>();

    const onSubmit = () => {};

    return (
        <HomePageContainer>
            <form onSubmit={() => handleSubmit(onSubmit)}>
                <TextInput
                    startAdornment={<SearchIcon />}
                    placeholder="جستجوی کالا ..."
                    name="search"
                    control={control}
                />
            </form>
            <Grid container spacing={1}>
                {props.posts.map((item, index) => (
                    <Grid key={index} item sm={4} xs={4}>
                        <Link href={`/products/${item.slug}`}>
                            <Post
                                image={item.post_images.find((image) => image.is_thumbnail)?.url}
                                key={index}
                            />
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <BottomMainMenu />
        </HomePageContainer>
    );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
    return <SiteLayout>{page}</SiteLayout>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const posts = await serverSideFetch<List<Post>>(context, 'marketplace/post/');

    return {
        props: {
            posts: posts.props.data?.results ? posts.props.data.results : null,
        },
    };
};

export default Home;

interface Post {
    slug: string;
    post_images: { url: string; is_thumbnail: boolean }[];
}
