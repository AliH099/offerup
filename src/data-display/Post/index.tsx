import Image from 'next/image';
import PostContainer from './styles';
import ImageIcon from '@mui/icons-material/Image';

interface PostProps {
    image?: string;
}

const Post: React.FC<PostProps> = (props) => {
    return (
        <PostContainer>
            {props.image ? (
                <Image src={props.image} alt="image" fill />
            ) : (
                <ImageIcon className="image" />
            )}
        </PostContainer>
    );
};

export default Post;
