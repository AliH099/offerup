import { Button, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import UploadedImageContainer, { RemoveButton } from './styles';
import httpRequest, { catchRequestError } from 'helpers/http-request';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import axios, { CancelTokenSource } from 'axios';
import { toast } from 'react-toastify';

interface UploadedImageProps {
    id: number;
    source: string;
    postID: number;
    isThumbnail: boolean;
    file: File;
    onRemoveImage: (id: number) => void;
}

const UploadedImage: React.FunctionComponent<UploadedImageProps> = (props) => {
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [complete, setComplete] = useState(false);
    const [progress, setProgress] = useState<number>(0);
    const [imagePk, setImagePk] = useState<number | undefined>();
    const [cancelToken] = useState<CancelTokenSource>(axios.CancelToken.source());

    const handleProgressBar = (progressEvent: any) => {
        setProgress((progressEvent.loaded / progressEvent.total) * 90);
    };

    useEffect(() => {
        const formData = new FormData();
        formData.append('post', props.postID.toString());
        formData.append('image', props.file);
        formData.append('is_thumbnail', String(props.isThumbnail));
        httpRequest<{ id: number }>(
            'marketplace/post/new_image/',
            'POST',
            formData,
            true,
            undefined,
            handleProgressBar,
            { cancelToken: cancelToken.token },
        )
            .then((res) => {
                setComplete(true);
                setProgress(100);
                setImagePk(res.data.id);
            })
            .catch((err) => {
                catchRequestError(err, true);
                setProgress(0);
            });
    }, []);

    const deleteRequest = () => {
        setDeleteLoading(true);
        httpRequest<ResponseType>(`marketplace/post/remove_image/${imagePk}/`, 'DELETE')
            .then((res) => {
                props.onRemoveImage(props.id);
            })
            .catch((err) => {
                catchRequestError(err);
            })
            .finally(() => {
                setDeleteLoading(false);
            });
    };

    const cancelUploading = () => {
        toast.error('بارگذاری عکس مورد نظر لغو شد');
        cancelToken.cancel('cancel-request');
        props.onRemoveImage(props.id);
    };

    return (
        <UploadedImageContainer>
            {deleteLoading ? (
                <CircularProgress className="circular-progress" />
            ) : (
                <RemoveButton disabled={!complete} onClick={deleteRequest}>
                    <DeleteIcon className="remove-icon" />
                </RemoveButton>
            )}
            <Button variant="contained" className="cancel" onClick={cancelUploading}>
                لغو
            </Button>
            <Image
                height={170}
                width={170}
                src={props.source}
                alt={`${props.id}th image`}
                className="image"
                style={{ opacity: complete ? '100%' : '50%' }}
            />

            {!complete && (
                <LinearProgress
                    color={progress === 100 ? 'primary' : 'secondary'}
                    variant="determinate"
                    value={progress}
                    className="progress-bar"
                />
            )}
        </UploadedImageContainer>
    );
};

export default UploadedImage;
