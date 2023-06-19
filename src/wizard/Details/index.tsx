import DetailsContainer from './styles';
import AutoComplete from 'inputs/AutoComplete';
import { Controller, useForm } from 'react-hook-form';
import WizardAction from 'wizard/WizardAction';
import { CategorySchema, DetailsStepProps } from './types';
import useFetch from 'hooks/useFetch';
import { useEffect, useState } from 'react';
import TextInput from 'inputs/TextInput';
import useWizardStore from 'store/wizard';
import useStepWizard from 'hooks/useStepWizard';
import { Stack } from '@mui/material';

const Details: React.FC<DetailsStepProps> = (props) => {
    const { metaData, setMetaData } = useWizardStore();
    // const { control, handleSubmit, watch } = useForm({
    //     defaultValues: { ...metaData.reduce((a, v) => ({ ...a, [v.en_label]: v.value }), {}) },
    // });
    const { control, handleSubmit, watch } = useForm();
    const wizard = useStepWizard();
    const { data, loading } = useFetch<CategorySchema>(
        `marketplace/category/schema/${watch('category') || 1}/`,
    );

    const ali = { weight: true, height: false, race: false };

    const onSubmit = (values: any) => {
        const { category, ...other } = values;
        setMetaData(data?.fields.map((item) => ({ ...item, value: values[item.en_label] })) || []);
        wizard.next();
    };

    useEffect(() => {
        console.log(watch('category'));
        console.log('metadata:', metaData);
        console.log('data:', data?.fields);
        data?.fields.map((item) =>
            console.log('compare', metaData.find((meta) => meta.en_label === item.en_label)?.value),
        );
    }, [watch('category')]);

    return (
        <DetailsContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AutoComplete
                    options={props.categories.map((item) => ({
                        label: item.name,
                        value: item.id,
                    }))}
                    name="category"
                    control={control}
                    label="category"
                />
                <Stack className="schema-container">
                    {watch('category') !== undefined &&
                        data?.fields.map((item, index) => (
                            <Controller
                                key={item.fa_label}
                                control={control}
                                rules={{
                                    required:
                                        metaData.find((meta) => meta.en_label === item.en_label)
                                            ?.value === undefined &&
                                        metaData.find((meta) => meta.en_label === item.en_label)
                                            ?.is_required
                                            ? 'این فیلد الزامی است'
                                            : false,
                                }}
                                defaultValue={
                                    metaData.find((meta) => meta.en_label === item.en_label)?.value
                                }
                                render={({ field }) => (
                                    <TextInput {...field} control={control} label={item.fa_label} />
                                )}
                                name={item.en_label}
                            />
                        ))}
                </Stack>
                <WizardAction />
            </form>
        </DetailsContainer>
    );
};

export default Details;
