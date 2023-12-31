import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Stack } from '@mui/material';
import Post from 'data-display/Post';
import useFetch from 'hooks/useFetch';
import useQueryParam from 'hooks/useQueryParam';
import BottomMainMenu from 'inputs/BottomMainMenu';
import TextInput from 'inputs/TextInput';
import SiteLayout from 'layout/SiteLayout';
import Link from 'next/link';
import HomePageContainer from 'page-containers/HomePageContainer';
import { useForm } from 'react-hook-form';
import Skeleton from 'skeletons/Skeleton';
import { NextPageWithLayout } from './_app';

interface HomeProps {}

const Home: NextPageWithLayout<HomeProps> = (props) => {
    const { control, handleSubmit } = useForm<{ search?: string }>({
        defaultValues: {
            search: '',
        },
    });
    const { setParam, resetParam, paramsArray, statparam } = useQueryParam<string>('search');
    const { data, loading } = useFetch<List<Post>>(`marketplace/post/?${statparam.toString()}`);
    const onSubmit = async (values: { search?: string }) => {
        values.search && setParam(values.search);
    };

    return (
        <HomePageContainer>
            <form onSubmit={handleSubmit(onSubmit)} method="post">
                <TextInput
                    startAdornment={<SearchIcon />}
                    placeholder="جستجوی کالا ..."
                    name="search"
                    control={control}
                    endAdornment={
                        paramsArray.length !== 0 && (
                            <CloseIcon className="delete-search" onClick={resetParam} />
                        )
                    }
                />
            </form>
            <Grid container spacing={1}>
                {loading
                    ? [...Array(5)].map(() => (
                          <Grid item sm={4} xs={4}>
                              <Stack alignItems="center">
                                  <Skeleton width="30vw" height="30vw" />
                              </Stack>
                          </Grid>
                      ))
                    : data?.results.map((item, index) => (
                          <Grid key={index} item sm={4} xs={4}>
                              <Link href={`/products/${item.slug}`}>
                                  <Post
                                      image={
                                          item.post_images.find((image) => image.is_thumbnail)?.url
                                      }
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

export default Home;

interface Post {
    slug: string;
    post_images: { url: string; is_thumbnail: boolean }[];
}
