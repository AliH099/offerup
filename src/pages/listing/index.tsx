import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import calcInterval from 'helpers/calc-interval';
import useFetch from 'hooks/useFetch';
import SectionHeader from 'layout/SectionHeader';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ListingPageContainer from 'page-containers/ListingPageContainer';
import { MyPostInterface } from 'page-containers/ListingPageContainer/types';
import { NextPageWithLayout } from 'pages/_app';
import MyPostSkeleton from 'skeletons/MyPostSkeleton';

const ListingPage: NextPageWithLayout = (props) => {
    const { data, loading } = useFetch<MyPostInterface[]>('marketplace/post/mine/', {
        revalidateOnMount: true,
    });
    const router = useRouter();

    return (
        <ListingPageContainer>
            <SectionHeader title="آگهی های من" onClickBack={() => router.push('./')} />
            <Stack className="content">
                {loading ? (
                    [...Array(2)].map(() => <MyPostSkeleton />)
                ) : data?.length === 0 ? (
                    <Typography variant="body1">شما هنوز هیچ آگهی ثبت نکرده اید</Typography>
                ) : (
                    data?.map((item, index) => (
                        <Paper className="post" variant="outlined" key={index}>
                            <Image
                                src={item.post_images.find((item) => item.is_thumbnail)?.url || ''}
                                width={100}
                                height={100}
                                alt="image"
                            />
                            <Typography variant="body1">{item?.title}</Typography>
                            <Typography variant="body2">
                                {item?.price !== null && item?.price.toLocaleString()}
                            </Typography>
                            <Typography variant="caption">
                                {calcInterval(item.updated_at)}
                            </Typography>
                            <Stack className="post-status">
                                <Typography variant="body1"> وضعیت آگهی:</Typography>
                                <Typography variant="body1" color="red">
                                    منقضی شده
                                </Typography>
                            </Stack>
                            <Stack gap="5px">
                                <Button variant="contained" color="primary">
                                    <Link href={`/listing/${item.slug}`}>مدیرت آگهی</Link>
                                </Button>

                                <Button variant="outlined" color="primary">
                                    <Link href={`/listing/offers/${item.slug}`}>
                                        لیست پیشنهادها
                                    </Link>
                                </Button>
                            </Stack>
                            <Divider />
                        </Paper>
                    ))
                )}
            </Stack>
        </ListingPageContainer>
    );
};

export default ListingPage;
