import SiteLayout from 'layout/SiteLayout';
import { Avatar, Divider, IconButton, Link as MuiLink, Stack, Typography } from '@mui/material';
import ProductDetailPageContainer from 'page-containers/ProductDetailPageContainer';
import ProductAction from 'inputs/ProductAction';
import Gallery from 'data-display/Gallery/Gallery';
import { useState } from 'react';
import textOverflowStyle from 'helpers/text-overflow-style';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

const ProductDetail = () => {
    const price = 25000000;
    const [hiddenTextOverflow, setHiddenTextOverflow] = useState<boolean>(true);
    return (
        <ProductDetailPageContainer>
            <Stack className="back-button-container">
                <Link href="../" className="back-button-link">
                    <IconButton className="back-button">
                        <ArrowForwardIcon color="primary" />
                    </IconButton>
                </Link>
            </Stack>
            <Gallery
                imagesPaths={[...Array(4)].map(
                    (_, index) => `https://picsum.photos/id/${index}/400/400`,
                )}
            />
            <Stack className="content">
                <Typography variant="h4">یک دستگاه آدامس جویده شده</Typography>
                <Typography variant="h5">{price.toLocaleString() + ' تومان'}</Typography>
                <Typography variant="body2" className="two-phrase">
                    <span>آخرین ویرایش:</span>
                    <span>دیروز</span>
                </Typography>
                <Typography variant="body2" className="two-phrase">
                    <span>شرایط:</span>
                    <span>پوسیده در حد نو</span>
                </Typography>
                <Typography variant="body2">عتیقه های گران قیمت</Typography>
                <Divider />
                <Stack direction="row" gap="15px">
                    <Avatar />
                    <Stack>
                        <Typography>الکس فرگوسن</Typography>
                        <Typography>عضویت از ۲۰ فروردین ۱۲۰۷</Typography>
                    </Stack>
                </Stack>
                <Divider />
                <Typography variant="h5">توضیحات</Typography>
                <Typography
                    variant="body2"
                    style={hiddenTextOverflow ? textOverflowStyle() : undefined}
                >
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
                    گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
                    برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
                    جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                    ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می
                    توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به
                    پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته
                    اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                </Typography>
                <MuiLink
                    onClick={() => setHiddenTextOverflow((prev) => !prev)}
                    className="link-button"
                >
                    {hiddenTextOverflow ? 'بیشتر' : 'بستن'}
                </MuiLink>
            </Stack>
            <ProductAction postID={2} />
        </ProductDetailPageContainer>
    );
};

ProductDetail.getLayout = function getLayout(page: React.ReactElement) {
    return <SiteLayout>{page}</SiteLayout>;
};

export default ProductDetail;
