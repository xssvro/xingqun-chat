import React, { useState, useRef, useEffect } from 'react';
import { SendOutlined } from '@ant-design/icons';
import Chat from './components/Chat.tsx';
import { ChatData } from './components/Chat.type.ts';
import { Flex, Splitter, Input, Button } from 'antd';
import { fetchEventSource } from '@microsoft/fetch-event-source';

const Home: React.FC = () => {
    const [chatData, setChatData] = useState<ChatData[]>([]);
    const [userMessage, setUserMessage] = useState<string>('');
    const [isSending, setIsSending] = useState<boolean>(false); // 事件锁
    const [isComposing, setIsComposing] = useState<boolean>(false); // 是否正在输入
    const [autoScroll, setAutoScroll] = useState<boolean>(true); // 控制自动滚动
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // 自动滚动到最底
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    // 监听 chatData 更新
    useEffect(() => {
        if (autoScroll) {
            scrollToBottom();
        }
    }, [chatData, autoScroll]);

    // 监听用户滚动事件
    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10; // 允许少量误差
            setAutoScroll(isAtBottom);
        }
    };

    // 发送消息函数，支持流式返回
    const handleSendMessage = async () => {
        if (!userMessage.trim() || isSending) return;

        setIsSending(true);
        setUserMessage('');

        const userChat: ChatData = {
            id: Date.now(),
            content: userMessage,
            message: userMessage,
            timestamp: Date.now(),
            type: 'text',
            role: 'user'
        };

        setChatData(prev => [...prev, userChat]);
        setAutoScroll(true);

        const contextMessages = chatData.slice(-5).map(chat => ({
            role: chat.role,
            content: chat.content
        }));

        const requestMessages = [
            ...contextMessages,
            { role: 'user', content: userMessage }
        ];

        const gptChatId = Date.now() + 1;
        const gptChat: ChatData = {
            id: gptChatId,
            content: '',
            message: '',
            timestamp: Date.now(),
            type: 'text',
            role: 'assistant'
        };
        setChatData(prev => [...prev, gptChat]);

        let accumulatedContent = '';

        try {
            await fetchEventSource('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer a3a70185-73df-4d8c-a3a2-78f943f9775b`
                },
                credentials: 'include',
                body: JSON.stringify({
                    model: 'ep-20250217143848-xw4l8',
                    messages: requestMessages,
                    stream: true
                }),
                // mode: 'no-cors',
                onmessage(event) {
                    console.log(event)
                    if (event.data === '[DONE]') {
                        return;
                    }

                    try {
                        // 清理数据
                        const jsonChunk = JSON.parse(event.data);
                        const deltaContent = jsonChunk.choices[0]?.delta?.content || '';

                        if (deltaContent) {
                            accumulatedContent += deltaContent;
                            setChatData(prev => prev.map(chat =>
                                chat.id === gptChatId ? { ...chat, content: accumulatedContent, message: accumulatedContent } : chat
                            ));
                        }
                    } catch (e) {
                        console.error("JSON 解析失败～:", e);
                    }
                },
                onerror(err) {
                    console.error('请求失败～:', err);
                    setIsSending(false);
                },
                onclose() {
                    setIsSending(false);
                }
            });
        } catch (error) {
            console.error('请求异常～:', error);
            setIsSending(false);
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !isComposing) {
            if (!e.shiftKey) {
                e.preventDefault(); // 阻止默认的换行行为
                handleSendMessage(); // 发送消息
            }
        }
    };
    return (
        <div className="h-full">
            <Splitter className="h-full" layout="vertical">
                <Splitter.Panel>
                    <div
                        ref={chatContainerRef}
                        onScroll={handleScroll}
                        className="h-full overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300"
                    >
                        <Chat chatData={chatData}></Chat>
                    </div>
                </Splitter.Panel>
                <Splitter.Panel defaultSize="15%" min="15%">
                    <Flex className="h-full p-2" vertical={true}>
                        <Input.TextArea
                            placeholder="开始你的脑洞~"
                            className="!resize-none flex-1 bg-transparent focus:bg-transparent hover:bg-transparent !border-0 focus:shadow-none"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            onCompositionStart={() => setIsComposing(true)} // 开始拼音输入
                            onCompositionEnd={() => setIsComposing(false)}   // 结束拼音输入
                            onKeyDown={handleKeyDown}
                        />
                        <Flex className="mt-2" justify="end">
                            <Button
                                onClick={handleSendMessage}
                                size="large"
                                type="primary"
                                icon={<SendOutlined />}
                            >
                                发送
                            </Button>
                        </Flex>
                    </Flex>
                </Splitter.Panel>
            </Splitter>
        </div>
    );
};

export default Home;