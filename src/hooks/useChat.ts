import { useState, useEffect, useRef } from 'react';
import { ChatData } from '../pages/Home/components/Chat.type';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export const useChat = () => {
    const [chatData, setChatData] = useState<ChatData[]>([]);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [autoScroll, setAutoScroll] = useState<boolean>(true);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        if (autoScroll) {
            scrollToBottom();
        }
    }, [chatData, autoScroll]);

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10;
            setAutoScroll(isAtBottom);
        }
    };

    const sendMessage = async (userMessage: string) => {
        if (!userMessage.trim() || isSending) return;

        setIsSending(true);
        // ... 其余发送消息的逻辑保持不变 ...
    };

    return {
        chatData,
        isSending,
        chatContainerRef,
        handleScroll,
        sendMessage
    };
}; 