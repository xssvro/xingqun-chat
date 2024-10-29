import React from 'react';
import { Flex, Layout, Space, Splitter } from 'antd';


const Home: React.FC = () => {
    return (
        <div className="page-home" style={{ height: '100%' }}>
            <Splitter layout="vertical" style={{ height: '100%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <Splitter.Panel>
                    <Flex justify="center" align="center" vertical={true} style={{ height: "100%", textAlign: "center" }}>
                        <h1 className="text-3xl font-bold mb-1">下午好</h1>
                        我是您的私人智能助理，请问现在能帮您做什么？<br/>
                        如果需要获得更加专业或定制的助手，可以点击 + 创建自定义助手
                    </Flex>
                </Splitter.Panel>
                <Splitter.Panel defaultSize="26%" min="26%">
                    下面
                </Splitter.Panel>
            </Splitter>
        </div>
    )
};

export default Home;