import PriceContainer from './styles';
import useWizardStore from 'store/wizard';
import WizardAction from 'wizard/WizardAction';
import useStepWizard from 'hooks/useStepWizard';
import PriceForm, { PriceVariant } from 'forms/PriceForm';

const Price = () => {
    const { price, setPrice } = useWizardStore();
    const wizard = useStepWizard();

    const onSubmit = (values: { price: number }) => {
        setPrice(values.price);
        wizard.next();
    };
    return (
        <PriceContainer>
            <PriceForm
                onSubmit={onSubmit}
                defaultValue={price}
                variant={PriceVariant.post}
                submitButton={<WizardAction />}
            />
        </PriceContainer>
    );
};

export default Price;
