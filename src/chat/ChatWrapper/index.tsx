import React, { useEffect, useState } from 'react';
import ChatWrapperContainer from './styles';
import useChat from 'chat/services';
import { Button, TextField } from '@mui/material';

interface ChatWrapperProps {
    children: React.ReactNode;
    phone: string;
}

const ChatWrapper: React.FC<ChatWrapperProps> = (props) => {
    const { messages, newMessage } = useChat(props.phone);
    const [value, setValue] = useState<string>();

    const onClickSend = () => {
        if (value) {
            newMessage(value);
        } else {
            return;
        }
    };

    return (
        <ChatWrapperContainer>
            <TextField value={value} onChange={(e) => setValue(e.target.value)} />
            <Button variant="contained" onClick={onClickSend}>
                Send
            </Button>
        </ChatWrapperContainer>
    );
};

export default ChatWrapper;
