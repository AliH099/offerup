import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Avatar, Divider, IconButton, Link as MuiLink, Stack, Typography } from '@mui/material';
import Gallery from 'data-display/Gallery/Gallery';
import calcInterval from 'helpers/calc-interval';
import { serverSideFetch } from 'helpers/http-request';
import textOverflowStyle from 'helpers/text-overflow-style';
import ProductAction from 'inputs/ProductAction';
import SiteLayout from 'layout/SiteLayout';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import ProductDetailPageContainer from 'page-containers/ProductDetailPageContainer';
import { PostDetail } from 'page-containers/ProductDetailPageContainer/types';
import { NextPageWithLayout } from 'pages/_app';
import { useState } from 'react';

interface ProductDetailProps {
    details: PostDetail;
}

const ProductDetail: NextPageWithLayout<ProductDetailProps> = (props) => {
    const [hiddenTextOverflow, setHiddenTextOverflow] = useState<boolean>(true);
    const { metadata, post_images, price, title, user, category, updated_at, description, id } =
        props.details;

    return (
        <ProductDetailPageContainer>
            <Stack className="back-button-container">
                <Link href="../" className="back-button-link">
                    <IconButton className="back-button">
                        <ArrowForwardIcon color="primary" />
                    </IconButton>
                </Link>
            </Stack>
            <Gallery imagesPaths={post_images} />
            <Stack className="content">
                <Typography variant="h4">{title}</Typography>
                <Typography variant="h5">{price.toLocaleString() + ' تومان'}</Typography>
                <Typography variant="body2" className="two-phrase">
                    <span>آخرین ویرایش:</span>
                    <span>{calcInterval(updated_at)}</span>
                </Typography>
                <Typography variant="body2">دسته بندی {category}</Typography>
                <Divider />
                <Stack direction="row" gap="15px">
                    <Avatar />
                    <Stack justifyContent="center">
                        <Typography>{user}</Typography>
                    </Stack>
                </Stack>
                <Divider />
                <Typography variant="h5">توضیحات</Typography>
                <Typography
                    variant="body2"
                    style={hiddenTextOverflow ? textOverflowStyle() : undefined}
                >
                    {description}
                </Typography>

                {description !== null ? (
                    <MuiLink
                        onClick={() => setHiddenTextOverflow((prev) => !prev)}
                        className="link-button"
                    >
                        {hiddenTextOverflow ? 'بیشتر' : 'بستن'}
                    </MuiLink>
                ) : (
                    <Typography variant="body2" color="grey">
                        این کالا توضیحاتی ندارد
                    </Typography>
                )}
                <Divider />
                <Typography variant="h5">مشخصات کالا</Typography>
                {metadata.map((item, index) => (
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" className="metadata-label">
                            {item.fa_label}
                        </Typography>
                        <Typography variant="body1" className="metadata-value">
                            {item.value}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
            <ProductAction postID={id} chatID={props.details.chat_id} />
        </ProductDetailPageContainer>
    );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const details = await serverSideFetch<PostDetail>(
        context,
        `marketplace/post/${context.query.slug}`,
    );

    return {
        props: {
            details: details.props.data ? details.props.data : null,
        },
    };
};

ProductDetail.getLayout = function getLayout(page: React.ReactElement) {
    return <SiteLayout>{page}</SiteLayout>;
};

export default ProductDetail;
