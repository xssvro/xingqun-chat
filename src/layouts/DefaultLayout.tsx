import React, { PropsWithChildren, useState } from 'react';
import { Button, Layout, Tag, Flex, Input, Switch } from 'antd';
import { SettingOutlined, OpenAIOutlined, GithubOutlined, WechatOutlined, DiscordOutlined } from '@ant-design/icons';
import Logo from '@/assets/logo.svg';
const { Content, Sider } = Layout;

const DefaultLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
    const [count, setCount] = useState(0);
    const handleClick = () => {
        setCount(count => count + 1);
    }
    return (
        <Layout style={{height: '100vh'}}>
            <Sider width={240} theme="light">
                <Flex className="h-full" vertical={true}>
                    <div className="mx-3 flex justify-center items-center h-16 text-2xl font-bold text-center mb-2">
                        {/*<Logo fill="#F73048" className="w-8"/>&ensp;*/}
                        自用@钛-Ai
                    </div>
                    <Flex className="mx-3 flex-1 space-y-3" vertical={true}>
                        <Input.Search placeholder="搜索对话..."></Input.Search>
                        <Button onClick={handleClick} style={{width: '100%'}} type="primary" size="large">+&ensp;创建新会话</Button>
                    </Flex>
                    <Flex className="mx-3 space-y-3 mb-3" vertical={true}>
                        <Switch className="w-2" defaultChecked></Switch>
                    </Flex>
                    {/*<Flex className="mx-3 mb-3 space-x-4" justify="center" align="center">*/}
                    {/*    <GithubOutlined className="text-xl" />*/}
                    {/*    <WechatOutlined className="text-xl" />*/}
                    {/*    <DiscordOutlined className="text-xl" />*/}
                    {/*</Flex>*/}
                </Flex>
            </Sider>
            <Layout>
                <div className="flex items-center w-full !p-4 border-b">
                    <Flex className="w-full" align="center">
                        <div className="flex-1 flex items-center">
                            <OpenAIOutlined style={{fontSize: '28px'}}/>
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
                </div>
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
