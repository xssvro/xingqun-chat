// Chat.tsx (修改后)
import React, { useRef, useState, useEffect } from 'react';
import { ChatData } from "./Chat.type.ts";
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import ReactMarkdown from 'react-markdown';

const renderAvatar = (item: ChatData) => {
    if (item.role === 'assistant') {
        return (
            <div className="flex items-center justify-center w-12 h-12 rounded-full relative bg-black">
                <div className="absolute w-1.5 h-3 bg-white left-3 animate-blink"></div>
                <div className="absolute w-1.5 h-3 bg-white right-3 animate-blink"></div>
            </div>
        );
    } else {
        return <div className="w-12 h-12 rounded-full bg-gray-300" />
    }
};

const Chat: React.FC<any> = ({ chatData }) => {
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const [isUserScrolling, setIsUserScrolling] = useState(false);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            if (scrollHeight - scrollTop - clientHeight < 20) {
                setIsUserScrolling(false);
            } else {
                setIsUserScrolling(true);
            }
        }
    };

    useEffect(() => {
        if (!isUserScrolling) {
            scrollToBottom();
        }
    }, [chatData, isUserScrolling]);

    return (
        <div
            ref={chatContainerRef}
            className="flex p-4 h-full flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300"
            onScroll={handleScroll}
        >
            {chatData.map((item: ChatData, index: number) => (
                <ChatItem key={`CHAT_${index}`} item={item} />
            ))}
        </div>
    );
};

export default Chat;