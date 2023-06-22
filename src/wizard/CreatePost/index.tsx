import { IconButton, Stack, Typography } from '@mui/material';
import CreatePostContainer from './styles';
import AddIcon from '@mui/icons-material/Add';
import TextInput from 'inputs/TextInput';
import Button from 'inputs/Button';
import Image from 'next/image';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import useWizardStore from 'store/wizard';
import { useForm } from 'react-hook-form';
import { CreatePostFormInterface } from './types';
import WizardAction from 'wizard/WizardAction';
import useStepWizard from 'hooks/useStepWizard';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object({
    title: yup.string().required('لطفا عنوان آگهی را وارد نمایید'),
});

const CreatePost: React.FC = () => {
    const { images, addToImages, removeFromImages } = useWizardStore();
    const { mainData, setMainData } = useWizardStore();
    const { control, handleSubmit } = useForm<CreatePostFormInterface>({
        defaultValues: {
            description: mainData.description,
            title: mainData.title,
        },
        resolver: yupResolver(validationSchema),
    });
    const wizard = useStepWizard();

    const handleCapture = (target: EventTarget & HTMLInputElement) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0];
                const newUrl = URL.createObjectURL(file);
                addToImages(newUrl);
            }
        }
    };

    const onSubmit = (values: CreatePostFormInterface) => {
        setMainData({ description: values.description, title: values.title });
        wizard.next();
    };

    const fileInput = (camera?: boolean) => (
        <input
            hidden
            type="file"
            accept="image/*"
            capture={camera ? 'environment' : undefined}
            onChange={(e) => handleCapture(e.target)}
        />
    );

    const removeImage = (id: number) => {
        removeFromImages(id);
    };

    return (
        <CreatePostContainer>
            <Stack className="images-container">
                {images.length === 0 ? (
                    <Stack gap="10px" width="100%">
                        <Button
                            component={'label'}
                            variant="outlined"
                            fullWidth
                            fullradius={1}
                            className="button"
                        >
                            {fileInput(true)}
                            <CameraAltIcon />
                            تصویر جدید
                        </Button>
                        <Button
                            component={'label'}
                            variant="outlined"
                            fullWidth
                            fullradius={1}
                            className="button"
                        >
                            {fileInput()}
                            <PhotoLibraryIcon />
                            انتخاب از گالری
                        </Button>
                        <Typography className="cover-help" variant="caption">
                            اولین تصویر به عنوان کاور انتخاب میشود
                        </Typography>
                    </Stack>
                ) : (
                    <Stack className="add-photo" component={'label'}>
                        <AddIcon className="plus" />
                        <Typography className="text">
                            <PhotoLibraryIcon />
                            افزودن تصویر
                        </Typography>
                        <Typography variant="caption">
                            {images.length} عکس از ۱۲ تا اضافه شده
                            {fileInput()}
                        </Typography>
                    </Stack>
                )}
                {images.map((item, index) => (
                    <Stack key={index} className="image-wrapper">
                        <IconButton
                            className="remove-icon-button"
                            onClick={() => removeImage(item.id)}
                        >
                            <DeleteIcon className="remove-icon" />
                        </IconButton>
                        <Image
                            height={170}
                            width={170}
                            src={item.source}
                            alt={`${index}th image`}
                            className="image"
                        />
                    </Stack>
                ))}
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    label="عنوان"
                    placeholder="شامل: برند ، اندازه ، رنگ و ...."
                    control={control}
                    name="title"
                />
                <TextInput
                    label="توضیحات (اختیاری)"
                    multiline
                    rows={5}
                    placeholder="مثال: بسیار زیبا و کاربردی ..."
                    control={control}
                    name="description"
                />
                <WizardAction />
            </form>
        </CreatePostContainer>
    );
};
export default CreatePost;
