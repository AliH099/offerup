import { IconButton, Stack, TextField } from '@mui/material';
import useChat from 'chat/services';
import React, { useState } from 'react';
import ChatWrapperContainer from './styles';
import SendIcon from '@mui/icons-material/Send';
import { Conversation } from 'chat/Conversation';

interface ChatWrapperProps {
    children: React.ReactNode;
    chatID: string;
}

const ChatWrapper: React.FC<ChatWrapperProps> = (props) => {
    const { messages, newMessage } = useChat(props.chatID);
    const [value, setValue] = useState<string>();

    const onClickSend = () => {
        if (value) {
            newMessage(value);
            setValue("");
        } else {
            return;
        }
    };

    return (
        <ChatWrapperContainer>
            <Stack rowGap="20px">
                <Conversation messages={messages} />
                <Stack direction="row" columnGap="10px">
                    <IconButton onClick={onClickSend} aria-label="send" color="primary">
                        <SendIcon />
                    </IconButton>
                    <TextField
                        fullWidth
                        size="small"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Stack>
            </Stack>
        </ChatWrapperContainer>
    );
};

export default ChatWrapper;
