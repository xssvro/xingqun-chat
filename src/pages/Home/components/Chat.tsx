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
    const chatContainerRef = useRef<HTMLDivElement | null>(null);  // 引用滚动容器
    const [isUserScrolling, setIsUserScrolling] = useState(false); // 判断是否为用户滚动

    // 自动滚动到最底部
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    // 监听滚动事件，判断用户是否手动滚动
    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            // 如果滚动条距离底部的距离小于 50px，认为用户滚动到了最底部
            if (scrollHeight - scrollTop - clientHeight < 20) {
                setIsUserScrolling(false);  // 用户滚动到最底，恢复自动滚动
            } else {
                setIsUserScrolling(true);  // 用户滚动到上面，停止自动滚动
            }
        }
    };

    // 每次 `chatData` 改变时，自动滚动到底部，除非用户手动滚动
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
            {chatData.map((item: ChatData, index: number) => {
                return (
                    <div
                        className={[
                            'flex w-full',
                            'gap-2',
                            item.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                        ].join(' ')}
                        key={`CHAT_${index}`}
                    >
                        {/* 条件渲染头像 */}
                        <div className="flex justify-center w-12">
                            {renderAvatar(item)}
                        </div>
                        {/* 回答体 */}
                        <div className="flex items-center max-w-[80%]">
                            <div className="bg-white rounded-md px-2.5 py-2 h-fit">
                                {/* 使用 react-markdown 渲染 MD 格式 */}
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeHighlight]}
                                >
                                    {item.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Chat;