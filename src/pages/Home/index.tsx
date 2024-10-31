import React from 'react';
import  { SendOutlined } from '@ant-design/icons';
import { Flex, Splitter, Input, Button } from 'antd';


const Home: React.FC = () => {
    return (
        <div className="h-full">
            <Splitter className="h-full" layout="vertical">
                <Splitter.Panel>
                    <Flex className="h-full" justify="center" align="center" vertical={true}>
                        <h1 className="text-3xl font-bold mb-1">下午好</h1>
                        我是您的私人智能助理，请问现在能帮您做什么？<br/>
                        如果需要获得更加专业或定制的助手，可以点击 + 创建自定义助手
                    </Flex>
                </Splitter.Panel>
                <Splitter.Panel defaultSize="24%" min="24%">
                    <Flex className="h-full p-2" vertical={true}>
                        <Input.TextArea placeholder="开始你的脑洞~" className="!resize-none flex-1"></Input.TextArea>
                        <Flex className="mt-2" justify="end">
                            <Button size="large" type="primary" icon={<SendOutlined />}>发送</Button>
                        </Flex>
                    </Flex>
                </Splitter.Panel>
            </Splitter>
        </div>
    )
};

export default Home;