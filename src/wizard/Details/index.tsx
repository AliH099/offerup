import DetailsContainer from './styles';
import AutoComplete from 'inputs/AutoComplete';
import { useForm } from 'react-hook-form';
import WizardAction from 'wizard/WizardAction';
import { CategorySchema, DetailsStepProps } from './types';
import useFetch from 'hooks/useFetch';
import { useEffect } from 'react';
import TextInput from 'inputs/TextInput';

const Details: React.FC<DetailsStepProps> = (props) => {
    const { control, handleSubmit, watch } = useForm();
    const { data, loading } = useFetch<CategorySchema>(
        `marketplace/category/schema/${watch('category') || 1}/`,
    );

    const onSubmit = (values: any) => {
        const { category, ...other } = values;
        console.log(other);
    };

    useEffect(() => {
        console.log(watch('category'));
    }, [watch('category')]);

    return (
        <DetailsContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AutoComplete
                    options={props.categories.map((item) => ({ label: item.name, value: item.id }))}
                    name="category"
                    control={control}
                    label="category"
                />
                {watch('category') !== undefined &&
                    data?.fields.map((item, index) => (
                        <TextInput control={control} name={item.en_label} label={item.fa_label} />
                    ))}
                <WizardAction />
            </form>
        </DetailsContainer>
    );
};

export default Details;
