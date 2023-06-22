import Button from 'inputs/Button';
import ProductActionContainer from './styles';
import FullScreenDrawer from 'data-display/FullScreenDrawer';
import { useState } from 'react';
import PriceForm, { PriceVariant } from 'forms/PriceForm';
import { ProductActionProps } from './types';
import httpRequest, { catchRequestError } from 'helpers/http-request';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';

const ProductAction: React.FC<ProductActionProps> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = (values: { price: number }) => {
        const requestBody = { price: values.price, post: props.postID };
        setLoading(true);
        httpRequest('marketplace/offer/', 'POST', requestBody)
            .then((res) => {
                setOpen(false);
                toast.success('پیشنهاد شما با موفقیت ثبت شد');
            })
            .catch((err) => {
                catchRequestError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <ProductActionContainer>
            <FullScreenDrawer open={open} setOpen={setOpen}>
                <Typography variant="body1">این کالا را به چه قیمتی می خواهید بخرید؟</Typography>
                <PriceForm onSubmit={onSubmit} variant={PriceVariant.offer} loading={loading} />
            </FullScreenDrawer>

            <Button fullradius={1} variant="outlined" fullWidth>
                درخواست
            </Button>
            <Button fullradius={1} fullWidth variant="contained" onClick={() => setOpen(true)}>
                ارائه پیشنهاد
            </Button>
        </ProductActionContainer>
    );
};

export default ProductAction;
