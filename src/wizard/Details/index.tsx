import DetailsContainer from './styles';
import AutoComplete from 'inputs/AutoComplete';
import { Controller, useForm } from 'react-hook-form';
import WizardAction from 'wizard/WizardAction';
import { CategorySchema, DetailsStepProps, MetaDataFieldSchema } from './types';
import useFetch from 'hooks/useFetch';
import TextInput from 'inputs/TextInput';
import useWizardStore from 'store/wizard';
import useStepWizard from 'hooks/useStepWizard';
import { CircularProgress, Stack, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import BooleanQuestion from 'inputs/BooleanQuestion';

const Details: React.FC<DetailsStepProps> = (props) => {
    const { metadata, setMetaData, setMainData, mainData } = useWizardStore();
    const { control, handleSubmit, watch } = useForm();
    const wizard = useStepWizard();
    const { data, loading } = useFetch<CategorySchema>(
        `marketplace/category/schema/${watch('category') || mainData.category}/`,
    );

    const onSubmit = (values: any) => {
        setMainData({ ...mainData, category: values.category });
        setMetaData(data?.fields.map((item) => ({ ...item, value: values[item.en_label] })) || []);
        wizard.next();
    };

    const onBooleanFieldChange = (fieldData: MetaDataFieldSchema, value: boolean) => {
        let tempArray = metadata;
        const index = tempArray.findIndex((item) => item.en_label === fieldData.en_label);
    };

    return (
        <DetailsContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    rules={{
                        required: 'لطفا دسته بندی را مشخص کنید',
                    }}
                    defaultValue={mainData.category}
                    render={({ field }) => (
                        <AutoComplete
                            {...field}
                            options={props.categories.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            name="category"
                            control={control}
                            label="category"
                        />
                    )}
                    name="category"
                />

                <Stack className="schema-container">
                    {(watch('category') !== undefined || mainData.category !== undefined) &&
                    loading ? (
                        <Stack alignItems="center">
                            <CircularProgress />
                        </Stack>
                    ) : (
                        data?.fields.map((item, index) =>
                            item.type === 'BOOL' ? (
                                <BooleanQuestion
                                    question={item.fa_label}
                                    onChange={(state) => onBooleanFieldChange(item, state)}
                                />
                            ) : (
                                <Controller
                                    key={item.fa_label}
                                    control={control}
                                    rules={{
                                        required:
                                            metadata.find((meta) => meta.en_label === item.en_label)
                                                ?.value === undefined && item.is_required
                                                ? 'این فیلد الزامی است'
                                                : false,
                                    }}
                                    defaultValue={
                                        metadata.find((meta) => meta.en_label === item.en_label)
                                            ?.value
                                    }
                                    render={({ field }) => (
                                        <TextInput
                                            {...field}
                                            control={control}
                                            label={item.fa_label}
                                        />
                                    )}
                                    name={item.en_label}
                                />
                            ),
                        )
                    )}
                </Stack>

                <WizardAction />
            </form>
        </DetailsContainer>
    );
};

export default Details;
