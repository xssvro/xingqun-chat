// ChatItem.tsx
import React from 'react';
import { ChatData } from "./Chat.type.ts";
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import ReactMarkdown from 'react-markdown';

interface ChatItemProps {
    item: ChatData;
}

const renderAvatar = (item: ChatData) => {
    if (item.role === 'assistant') {
        return (
            <div className="flex items-center justify-center w-8 h-8 rounded-full relative bg-black">
                <div className="absolute w-1.5 h-3 left-3 animate-blink"></div>
                <div className="absolute w-1.5 h-3 right-3 animate-blink"></div>
            </div>
        );
    } else {
        return <div className="w-10 h-10 rounded-full bg-gray-300" />
    }
};

const ChatItem: React.FC<ChatItemProps> = ({ item }) => {
    const isUser = item.role === 'user';

    return (
        <div
            className={[
                'flex flex-col w-full text-md',
                'gap-2',
                item.role === 'user' ? 'items-end' : 'items-start'
            ].join(' ')}
        >
            {/* 条件渲染头像 */}
            <div className="flex items-center gap-2 text-lg">
                {item.role === 'user' ? '你' : ''}{renderAvatar(item)}{item.role === 'assistant' ? 'Ai' : ''}
            </div>
            {/* 回答体 */}
            <div
                className={[
                    'flex items-center max-w-full rounded-lg',
                    isUser
                        ? 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white' // 用户气泡（问题）：浅灰色
                        : 'text-black dark:text-white' // AI 气泡（回答）：无背景色，仅文本
                ].join(' ')}
            >
                <div className="rounded-md px-3 py-2 h-fit max-w-full">
                    {/* 使用 react-markdown 渲染 MD 格式 */}
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        className="markdown"
                    >
                        {item.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default ChatItem;