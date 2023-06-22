import * as React from 'react';
import { Box, Stack, Typography, Button, Divider, Paper } from '@mui/material';
import Image from 'next/image';
import ListingPageContainer from 'page-containers/ListingPageContainer';
import SectionHeader from 'layout/SectionHeader';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import Link from 'next/link';

interface ListingPageProps {}

const ListingPage: NextPageWithLayout<ListingPageProps> = (props) => {
    const router = useRouter();

    return (
        <ListingPageContainer>
            <SectionHeader title="آگهی های من" onClickBack={() => router.push('./')} />
            <Stack className="content">
                {[...Array(4)].map((_, index) => (
                    <Paper className="post" variant="outlined" key={index}>
                        <Image src="/images/test.jpg" width={100} height={100} alt="image" />
                        <Typography variant="body1">آگهی شماره یک</Typography>
                        <Typography variant="body2">27000</Typography>
                        <Typography variant="caption"> ۷ هفته پیش</Typography>
                        <Stack className="post-status">
                            <Typography variant="body1"> وضعیت آگهی:</Typography>
                            <Typography variant="body1" color="red">
                                منقضی شده
                            </Typography>
                        </Stack>
                        <Stack gap="5px">
                            <Button variant="contained" color="primary">
                                مدیرت آگهی
                            </Button>
                            <Button variant="outlined" color="primary">
                                <Link href="/listing/offers/1/">لیست پیشنهادها</Link>
                            </Button>
                        </Stack>
                        <Divider />
                    </Paper>
                ))}
            </Stack>
        </ListingPageContainer>
    );
};

export default ListingPage;
