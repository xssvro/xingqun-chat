import React from 'react';
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
    return (
        <div className="flex p-4 h-full flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
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