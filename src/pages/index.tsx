import BottomMainMenu from 'inputs/BottomMainMenu';
import TextInput from 'inputs/TextInput';
import SiteLayout from 'layout/SiteLayout';
import HomePageContainer from 'page-containers/HomePageContainer';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, Stack } from '@mui/material';
import Post from 'data-display/Post';
import Link from 'next/link';
import { Form, useForm } from 'react-hook-form';
import { serverSideFetch } from 'helpers/http-request';
import { GetServerSidePropsContext } from 'next';
import { NextPageWithLayout } from './_app';
import useQueryParam from 'hooks/useQueryParam';
import useFetch from 'hooks/useFetch';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Skeleton from 'skeletons/Skeleton';

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
