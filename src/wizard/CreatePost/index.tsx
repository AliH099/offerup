import { Stack, Typography } from '@mui/material';
import CreatePostContainer from './styles';
import AddIcon from '@mui/icons-material/Add';
import TextInput from 'inputs/TextInput';
import Button from 'inputs/Button';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import useWizardStore from 'store/wizard';
import { useForm } from 'react-hook-form';
import { CreatePostFormInterface } from './types';
import WizardAction from 'wizard/WizardAction';
import useStepWizard from 'hooks/useStepWizard';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import UploadedImage from 'data-display/UploadedImage';
import { useEffect } from 'react';
import httpRequest, { catchRequestError } from 'helpers/http-request';

const validationSchema = yup.object({
    title: yup.string().required('لطفا عنوان آگهی را وارد نمایید'),
});

const CreatePost: React.FC = () => {
    const { images, addToImages, removeFromImages, mainData, setMainData, setPostID } =
        useWizardStore();
    const wizard = useStepWizard();
    const { control, handleSubmit } = useForm<CreatePostFormInterface>({
        defaultValues: {
            description: mainData.description,
            title: mainData.title,
        },
        resolver: yupResolver(validationSchema),
    });

    const handleCapture = (target: EventTarget & HTMLInputElement) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0];
                const newUrl = URL.createObjectURL(file);
                addToImages(newUrl, file);
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

    useEffect(() => {
        httpRequest<{ id: number }>('marketplace/post/temp/', 'POST')
            .then((res) => {
                setPostID(res.data.id);
            })
            .catch((err) => {
                catchRequestError(err, true);
            });
    }, []);

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
                    <UploadedImage
                        {...item}
                        key={index}
                        postID={1}
                        isThumbnail={index === 0}
                        onRemoveImage={removeImage}
                    />
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
