import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import { faNumberToEn } from 'helpers/utils';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import PriceFormContainer, { PriceInput } from './styles';
import { PriceFormProps } from './types';

export enum PriceVariant {
    offer = 'پیشنهاد',
    post = 'آگهی',
}

const PriceForm: React.FC<PriceFormProps> = (props) => {
    const validationSchema = yup.object({
        price: yup.number().required(`لطفا مبلغ ${props.variant} را وارد کنید`),
    });

    const { control, handleSubmit, watch } = useForm<{ price: number }>({
        resolver: yupResolver(validationSchema),
    });

    return (
        <PriceFormContainer>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <Controller
                    control={control}
                    rules={{ required: 'لطفا مبلغ آگهی را وارد کنید' }}
                    defaultValue={props.defaultValue}
                    render={({ field }) => (
                        <PriceInput
                            {...field}
                            endAdornment={'ریال'}
                            control={control}
                            name="price"
                            onChange={(e) =>
                                field.onChange(convertToNumber(faNumberToEn(e.target.value)))
                            }
                        />
                    )}
                    name="price"
                />
                {props.submitButton || (
                    <Stack className="button-container">
                        <LoadingButton
                            loading={props.loading}
                            className="submit-button"
                            type="submit"
                            variant="contained"
                        >
                            ثبت پیشنهاد
                        </LoadingButton>
                    </Stack>
                )}
            </form>
        </PriceFormContainer>
    );
};

export default PriceForm;

const convertToNumber = (num: string) => {
    if (num === '') {
        return 0;
    } else {
        parseInt(num);
    }
};
