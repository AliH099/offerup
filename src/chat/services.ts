import httpRequest from 'helpers/http-request';
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

type Message = {
    content: string;
    sent: boolean;
    timestamp: string;
};

const url = String(process.env.NEXT_PUBLIC_CHAT_WS_URL);

const useChat = (phone: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [history, setHistory] = useState<{ [key: string]: any }[]>([]);
    const [userID, setUserID] = useState<string>();
    const [status, setStatus] = useState<string>(connectionStatus[ReadyState.CLOSED]);
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
                            sent: false,
                            timestamp: msg.data.ts,
                        },
                    ]);
                    break;
                case 'meta':
                    const users = msg.meta.sub;
                    const result = users ? users.find((user: any) => user.topic === userID) : undefined;
                    if (users !== undefined && result) {
                        sendJsonMessage({
                            sub: {
                                id: Date.now().toString(),
                                topic: userID,
                                get: {
                                    data: {
                                        limit: 24,
                                    },
                                    sub: {
                                        ims: result.updated,
                                    },
                                    desc: {
                                        ims: result.updated,
                                    },
                                    what: 'data sub desc del',
                                },
                            },
                        });
                    } else {
                        sendJsonMessage({
                            get: {
                                id: Date.now().toString(),
                                topic: userID,
                                what: 'desc sub',
                            },
                        });
                    }
                    break;
            }
        },
    });

    useEffect(() => {
        console.log(messages);
    }, [messages]);

    useEffect(() => {
        setStatus(connectionStatus[readyState]);
    }, [readyState]);

    useEffect(() => {
        httpRequest<ChatUserInfo>('account/chat/', 'POST', { phone_number: phone }).then((res) => {
            setUserID(res.data.requested_user_id);
            hi();
            login(res.data.token);
            subscribe();
        });
    }, []);

    useEffect(() => {
        if (lastJsonMessage !== null) {
            setHistory((prev) => prev.concat(lastJsonMessage));
        }
    }, [lastJsonMessage, setHistory]);

    const subscribe = () => {
        sendJsonMessage({
            sub: {
                id: Date.now().toString(),
                topic: 'me',
                get: {
                    what: 'sub desc tags cred',
                },
            },
        });
    };

    const hi = () => {
        sendJsonMessage({
            hi: {
                id: Date.now().toString(),
                ver: String(process.env.NEXT_PUBLIC_CHAT_VERSION),
            },
        });
    };

    const login = (token: string) => {
        sendJsonMessage({
            login: {
                id: Date.now().toString(),
                scheme: 'token',
                secret: token,
            },
        });
    };

    const newMessage = (text: string) => {
        const timestamp = new Date().toISOString();
        setMessages((prev) => [
            ...prev,
            {
                content: text,
                sent: true,
                timestamp: timestamp,
            },
        ]);

        sendJsonMessage({
            pub: {
                id: Date.now().toString(),
                topic: userID,
                noecho: true,
                content: text,
            },
        });
    };

    return { messages, history, newMessage, readyState, status };
};

export default useChat;
