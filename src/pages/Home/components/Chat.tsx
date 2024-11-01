import React from 'react';
import { ChatItem } from "./Chat.type.ts";

const chatList: ChatItem[] = [{
    type: 'question',
    content: '在 JavaScript 中，防抖（Debounce）是一种优化技术，通过限制某个函数在一定时间段内只能执行一次来提高性能。通常用于处理浏览器事件，如窗口大小调整、滚动、输入框的实时输入等。\n' +
        '\n' +
        '以下是一个简单的防抖函数的实现：',
}, {
    type: 'answer',
    content: 'My name is Chatbot.'
}, {
    type: 'question',
    content: '你叫什么名字？',
}, {
    type: 'answer',
    content: '我的名字是聊天机器人'
}, {
    type: 'question',
    content: '在 JavaScript 中，防抖（Debounce）是一种优化技术，通过限制某个函数在一定时间段内只能执行一次来提高性能。通常用于处理浏览器事件，如窗口大小调整、滚动、输入框的实时输入等。\n' +
        '\n' +
        '以下是一个简单的防抖函数的实现：',
}, {
    type: 'answer',
    content: 'My name is Chatbot.'
}, {
    type: 'question',
    content: '你叫什么名字？',
}, {
    type: 'answer',
    content: '我的名字是聊天机器人'
}, {
    type: 'question',
    content: '在 JavaScript 中，防抖（Debounce）是一种优化技术，通过限制某个函数在一定时间段内只能执行一次来提高性能。通常用于处理浏览器事件，如窗口大小调整、滚动、输入框的实时输入等。\n' +
        '\n' +
        '以下是一个简单的防抖函数的实现：',
}, {
    type: 'answer',
    content: 'My name is Chatbot.'
}, {
    type: 'question',
    content: '你叫什么名字？',
}, {
    type: 'answer',
    content: '我的名字是聊天机器人'
}, {
    type: 'question',
    content: '在 JavaScript 中，防抖（Debounce）是一种优化技术，通过限制某个函数在一定时间段内只能执行一次来提高性能。通常用于处理浏览器事件，如窗口大小调整、滚动、输入框的实时输入等。\n' +
        '\n' +
        '以下是一个简单的防抖函数的实现：',
}, {
    type: 'answer',
    content: 'My name is Chatbot.'
}, {
    type: 'question',
    content: '你叫什么名字？',
}, {
    type: 'answer',
    content: '我的名字是聊天机器人'
}];

const renderAvatar = (item: ChatItem) => {
    if (item.type === 'answer') {
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

const Chat: React.FC = () => {
    return (
        <div className="flex p-4 h-full flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
            {chatList.map((item, index) => {
                return (
                    <div
                        className={[
                            'flex w-full',
                            'gap-2',
                            item.type === 'question' ? 'flex-row-reverse' : 'flex-row'
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
                                {item.content}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Chat;