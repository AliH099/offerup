import { Box } from '@mui/material';
import { Message } from 'chat/Message';
import { Message as MessageType } from 'chat/services';
import React, { useEffect, useRef } from 'react';

export const Conversation = (props: { messages: MessageType[] }): JSX.Element => {
    let myRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // after new message
        return () => {
            if (myRef && myRef.current) myRef.current.scrollIntoView({ behavior: 'smooth' });
        };
    }, [props]);

    return (
        <Box sx={{ height: 'calc(100vh - 120px)', overflowY: 'auto', padding: '30px 0' }}>
            {props.messages.map((item, index: number) => {
                return <Message key={index} guest={item.sent} text={item.content} />;
            })}
            <div ref={myRef} />
        </Box>
    );
};
