import { Box, Stack, Typography, Button, Divider, Paper, SwipeableDrawer } from '@mui/material';
import Image from 'next/image';
import ListingPageContainer from 'page-containers/ListingPageContainer';
import SectionHeader from 'layout/SectionHeader';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import Link from 'next/link';
import OffersPageContainer from 'page-containers/OffersPageContainer';
import { useState } from 'react';
import WarningDrawer from 'inputs/WarningDrawer';

interface OffersPageProps {}

const OffersPage: NextPageWithLayout<OffersPageProps> = (props) => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedOfferId, setSelectedOfferId] = useState<number>();

    const onOfferTap = (offerId: number) => {
        setSelectedOfferId(offerId);
        setOpen(true);
    };

    return (
        <OffersPageContainer>
            <WarningDrawer
                warningText="آیا از پذیرفتن پیشنهاد اول مطمئن هستید؟"
                open={open}
                setOpen={setOpen}
                onReject={() => setOpen(false)}
                onAccept={() => {}}
            />
            <SectionHeader title="پیشنهاد ها" onClickBack={() => router.push('../')} />
            <Stack className="content">
                <Paper variant="outlined" className="post-info">
                    <Stack gap="5px">
                        <Typography variant="caption">پیشنهادات برای:</Typography>
                        <Typography variant="body1">آگهی شماره یک</Typography>
                        <Typography variant="body2">27000</Typography>
                        <Typography variant="caption"> ۷ هفته پیش</Typography>
                    </Stack>
                    <Image src="/images/test.jpg" width={100} height={100} alt="image" />
                </Paper>
                <Typography variant="body1" color="primary">
                    برای پذیرفتن پیشنهاد بر روی آن ضربه بزنید
                </Typography>
                {[...Array(4)].map((_, index) => (
                    <Paper
                        variant="outlined"
                        className="offer"
                        key={index}
                        onClick={() => onOfferTap(1)}
                    >
                        <Stack className="offer-info">
                            <Stack>
                                <Typography variant="body2">حسن بقال</Typography>
                                <Typography variant="body2">سه هفته پیش</Typography>
                            </Stack>
                            <Typography variant="h6">25000000</Typography>
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        </OffersPageContainer>
    );
};

export default OffersPage;
