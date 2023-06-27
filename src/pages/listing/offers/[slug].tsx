import { Stack, Typography, Paper } from '@mui/material';
import Image from 'next/image';
import SectionHeader from 'layout/SectionHeader';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import OffersPageContainer from 'page-containers/OffersPageContainer';
import { useState } from 'react';
import WarningDrawer from 'inputs/WarningDrawer';
import useFetch from 'hooks/useFetch';
import httpRequest, { catchRequestError } from 'helpers/http-request';
import { toast } from 'react-toastify';
import { OfferDetails } from 'page-containers/OffersPageContainer/types';
import ReceivedOffer from 'data-display/ReceivedOffer';
import OfferReceivedSkeleton from 'skeletons/OfferReceivedSkeleton';
import { PostDetail } from 'page-containers/ProductDetailPageContainer/types';
import moment from 'moment-jalaali';

const OffersPage: NextPageWithLayout = () => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedOfferId, setSelectedOfferId] = useState<number>();
    const [selectedProposingUser, setSelectedProposingUser] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const { data, loading: dataLoading } = useFetch<OfferDetails[]>(
        `marketplace/offer/received/${router.query.slug}/`,
    );
    const { data: detailData, loading: detailDataLoading } = useFetch<PostDetail>(
        `marketplace/post/${router.query.slug}/`,
    );
    const onOfferTap = (offerId: number, proposingUser: string) => {
        setSelectedOfferId(offerId);
        setSelectedProposingUser(proposingUser);
        setOpen(true);
    };

    const acceptOffer = () => {
        setLoading(true);
        httpRequest<Response>(`marketplace/offer/accept/${selectedOfferId}/`, 'GET')
            .then((res) => {
                toast.success('شما پیشنهاد را با موفقیت پذیرفتید');
            })
            .catch((err) => {
                catchRequestError(err, true);
            })
            .finally(() => {
                setLoading(false);
                setOpen(false);
            });
    };

    return (
        <OffersPageContainer>
            <WarningDrawer
                warningText={`آیا از پذیرفتن پیشنهاد ${selectedProposingUser} مطمئن هستید؟`}
                open={open}
                setOpen={setOpen}
                onReject={() => setOpen(false)}
                onAccept={() => {
                    acceptOffer();
                }}
                acceptLoading={loading}
            />
            <SectionHeader title="پیشنهاد ها" onClickBack={() => router.push('../')} />
            <Stack className="content">
                <Paper variant="outlined" className="post-info">
                    <Stack gap="5px">
                        <Typography variant="caption">پیشنهادات برای:</Typography>
                        <Typography variant="body1">{detailData?.title}</Typography>
                        <Typography variant="body2">{detailData?.price}</Typography>
                        <Typography variant="caption">
                            {moment(detailData?.updated_at).format('HH:mm jYYYY/jMM/jDD')}
                        </Typography>
                    </Stack>
                    <Image
                        src={detailData?.post_images[0] || ''}
                        width={100}
                        height={100}
                        alt="image"
                    />
                </Paper>
                {dataLoading ? (
                    [...Array(7)].map(() => <OfferReceivedSkeleton />)
                ) : (
                    <Stack gap="10px">
                        <Typography variant="body1" color="primary">
                            {data?.length === 0 || !data
                                ? 'شما برای این آگهی هنوز هیچ پیشنهادی دریافت نکرده اید'
                                : 'برای پذیرفتن پیشنهاد بر روی آن ضربه بزنید'}
                        </Typography>
                        {data?.map((item, index) => (
                            <ReceivedOffer key={index} onClick={onOfferTap} {...item} />
                        ))}
                    </Stack>
                )}
            </Stack>
        </OffersPageContainer>
    );
};

export default OffersPage;
