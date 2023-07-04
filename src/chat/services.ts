import httpRequest from 'helpers/http-request';
import { useCounter } from 'hooks/useCounter';
import { useToggle } from 'hooks/useToggle';
import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

type ChatUserInfo = {
    token: string;
    requested_user_id: string;
};

export type Message = {
    id?: number;
    content: string;
    sent: boolean;
    timestamp: string;
};

const url = String(process.env.NEXT_PUBLIC_CHAT_WS_URL);

const useChat = (chatID: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [history, setHistory] = useState<{ [key: string]: any }[]>([]);
    const [userID, setUserID] = useState<string>();
    const [messageQueue, setMessageQueue] = useState<Message[]>([]);
    const [status, setStatus] = useState<string>(connectionStatus[ReadyState.CLOSED]);
    const { count, increment } = useCounter(4);
    const [newMessageToggle, toggle] = useToggle(false);

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url, {
        onMessage: (event) => {
            const msg = JSON.parse(event.data);
            const type = Object.keys(msg)[0];

            switch (type) {
                case 'data':
                    setMessages((prev) => [
                        ...prev,
                        {
                            content: msg.data.content,
                            sent: msg.data.topic === userID,
                            timestamp: msg.data.ts,
                        },
                    ]);
                    break;
            }
        },
    });

    useEffect(() => {
        console.log(messages);
    }, [messages]);

    useEffect(() => {
        increment();
    }, [newMessageToggle]);

    useEffect(() => {
        setStatus(connectionStatus[readyState]);
    }, [readyState]);

    useEffect(() => {
        httpRequest<ChatUserInfo>('account/chat/', 'POST', { chat_id: chatID }).then((res) => {
            setUserID(res.data.requested_user_id);
            hi();
            login(res.data.token);
            subscribe();
            fetchMessages(res.data.requested_user_id);
        });
    }, []);

    useEffect(() => {
        const msg = lastJsonMessage as any;
        if (lastJsonMessage !== null && msg.ctrl) {
            const message = messageQueue.find((item) => item.id === Number(msg.ctrl.id));

            if (message) {
                setMessageQueue((prev) => prev.filter((item) => item.id !== Number(msg.ctrl.id)));
                setMessages((prev) => [...prev, message]);
                readMessage(msg.ctrl.params.seq)
                recieveMessage(msg.ctrl.params.seq)
            }
        }
    }, [lastJsonMessage, setHistory]);

    const hi = () => {
        sendJsonMessage({
            hi: {
                id: '1',
                ver: String(process.env.NEXT_PUBLIC_CHAT_VERSION),
            },
        });
    };

    const login = (token: string) => {
        sendJsonMessage({
            login: {
                id: '2',
                scheme: 'token',
                secret: token,
            },
        });
    };

    const subscribe = () => {
        sendJsonMessage({
            sub: {
                id: '3',
                topic: 'me',
                get: {
                    what: 'sub desc tags cred',
                },
            },
        });
    };

    const fetchMessages = (userID: string) => {
        sendJsonMessage({
            sub: {
                id: '4',
                topic: userID,
                get: {
                    data: {
                        limit: 24,
                    },
                    sub: {
                        ims: new Date().toISOString(),
                    },
                    desc: {
                        ims: new Date().toISOString(),
                    },
                    what: 'data sub desc del',
                },
            },
        });
    };

    const newMessage = (text: string) => {
        const timestamp = new Date().toISOString();

        toggle();
        sendJsonMessage({
            pub: {
                id: String(count),
                topic: userID,
                noecho: true,
                content: text,
            },
        });
        setMessageQueue((prev) => [
            ...prev,
            {
                id: count,
                content: text,
                sent: true,
                timestamp: timestamp,
            },
        ]);
    };

    const readMessage = (seq: number) => {
        sendJsonMessage({
            note: {
                topic: userID,
                what: 'read',
                seq: seq,
            },
        });
    };

    const recieveMessage = (seq: number) => {
        sendJsonMessage({
            note: {
                topic: userID,
                what: 'recv',
                seq: seq,
            },
        });
    };

    return { messages, history, newMessage, readyState, status };
};

export default useChat;
