import PriceContainer, { PriceInput } from './styles';
import { Controller, useForm } from 'react-hook-form';
import useWizardStore from 'store/wizard';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import WizardAction from 'wizard/WizardAction';
import useStepWizard from 'hooks/useStepWizard';
import { faNumberToEn } from 'helpers/utils';

const validationSchema = yup.object({
    price: yup.number().required('لطفا مبلغ آگهی را وارد کنید'),
});

const Price = () => {
    const { price, setPrice } = useWizardStore();
    const wizard = useStepWizard();
    const { control, handleSubmit, watch } = useForm<{ price: number }>({
        defaultValues: {
            price: price,
        },
        resolver: yupResolver(validationSchema),
    });
    const onSubmit = (values: { price: number }) => {
        setPrice(values.price);
        wizard.next();
    };
    return (
        <PriceContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    rules={{ required: 'لطفا مبلغ آگهی را وارد کنید' }}
                    defaultValue={price}
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
                <WizardAction />
            </form>
        </PriceContainer>
    );
};

export default Price;

const convertToNumber = (num: string) => {
    if (num === '') {
        return 0;
    } else {
        parseInt(num);
    }
};
