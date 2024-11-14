import React, { useState, useRef, useEffect } from 'react';
import { SendOutlined } from '@ant-design/icons';
import Chat from './components/Chat.tsx';
import { ChatData } from './components/Chat.type.ts';
import { Flex, Splitter, Input, Button } from 'antd';

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

        setIsSending(true); // 开始发送消息，设置锁
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
        setAutoScroll(true); // 提交时自动滚动

        // 构建消息上下文，最多保留最近 5 条对话
        const contextMessages = chatData.slice(-5).map(chat => ({
            role: chat.role,
            content: chat.content
        }));

        // 将用户消息也加到历史对话中
        const requestMessages = [
            ...contextMessages,
            { role: 'user', content: userMessage }
        ];
        try {
            const response = await fetch('https://api.lingyiwanwu.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 1a4c6ca07768474fb1b9055f0fc3f198`
                },
                body: JSON.stringify({
                    model: 'yi-large',
                    messages: requestMessages,
                    stream: true
                })
            });

            const reader = response.body?.getReader();
            if (!reader) throw new Error('流读取失败');

            let accumulatedContent = '';
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

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = new TextDecoder().decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.trim() === '' || line.trim() === 'data: [DONE]') continue;

                    // 使用正则提取以 `data:` 开头，并且包含 JSON 格式的行
                    const jsonMatch = line.match(/^data:\s*(\{.*\})$/);

                    if (jsonMatch) {
                        const jsonString = jsonMatch[1];
                        try {
                            // 仅解析符合 JSON 格式的字符串
                            const jsonChunk = JSON.parse(jsonString);
                            const deltaContent = jsonChunk.choices[0]?.delta?.content || '';

                            if (deltaContent) {
                                accumulatedContent += deltaContent;
                                setChatData(prev => prev.map(chat =>
                                    chat.id === gptChatId ? { ...chat, content: accumulatedContent, message: accumulatedContent } : chat
                                ));
                            }

                            if (jsonChunk.lastOne) break;

                        } catch (e) {
                            console.error("JSON 解析失败～:", e);
                        }
                    } else {
                        console.warn("跳过非 JSON 格式的数据:", line);
                    }
                }
            }
        } catch (error) {
            console.error('请求失败～:', error);
        } finally {
            setIsSending(false); // 解锁
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