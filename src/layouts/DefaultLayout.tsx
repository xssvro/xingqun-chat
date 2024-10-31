import React, { PropsWithChildren } from 'react';
import { Button, Layout, Tag, Flex, Input } from 'antd';
const { Header, Content, Sider } = Layout;
import { SettingOutlined, OpenAIOutlined } from '@ant-design/icons';
import Logo from '@/assets/logo.svg';

const DefaultLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
    return (
        <Layout style={{height: '100vh'}}>
            <Sider width={240} style={{background: '#fff', padding: 0, borderRight: '1px solid #DDD'}}>
                <div className="mx-3 flex items-center h-16 text-2xl font-bold text-center mb-2">
                    <Logo fill="#F73048" className="w-12" />&ensp;星群@CHAT
                </div>
                <Flex className="mx-3 space-y-3" vertical={true}>
                    <Input.Search placeholder="搜索对话..."></Input.Search>
                    <Button style={{ width: '100%' }} type="primary" size="large">+&ensp;创建新会话</Button>
                </Flex>
            </Sider>
            <Layout>
                <Header className="flex items-center w-full !p-4 border-b bg-white">
                    <Flex className="w-full" align="center">
                        <div className="flex-1 flex items-center">
                            <OpenAIOutlined style={{ fontSize: '28px' }} />
                            <span className="mx-2 !text-xl font-bold">随便聊聊</span>
                            <Tag>
                                ChatGPT-4o
                            </Tag>
                            <Tag>
                                测试代码数据库
                            </Tag>
                        </div>
                        <div>
                            <Button type="text" icon={<SettingOutlined />} />
                        </div>
                    </Flex>
                </Header>
                <Layout>
                    <Content>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
};

export default DefaultLayout;