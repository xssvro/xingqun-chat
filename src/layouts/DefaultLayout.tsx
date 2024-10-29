import React, { PropsWithChildren } from 'react';
import { Button, Layout, Space } from 'antd';
const { Header, Content, Sider } = Layout;
import Icon, { HomeOutlined } from '@ant-design/icons';
import type { GetProps } from 'antd';

type CustomIconComponentProps = GetProps<typeof Icon>;
const ProSvg = () => (
    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7832">
        <path
            d="M897 219c52.49 0 95.14 42.125 95.987 94.412L993 315v372c0 52.49-42.125 95.14-94.412 95.987L897 783H128c-52.49 0-95.14-42.125-95.987-94.412L32 687V315c0-52.49 42.125-95.14 94.412-95.987L128 219h769z m0 64H128c-17.496 0-31.713 14.042-32 31.47V687c0 17.496 14.042 31.713 31.47 32H897c17.496 0 31.713-14.042 32-31.47V315c0-17.496-14.042-31.713-31.47-32H897z m-159.006 87.953c75.059 0 122.344 50.45 122.344 131.309 0 80.683-47.285 131.133-122.344 131.133-75.234 0-122.344-50.45-122.344-131.133 0-80.86 47.11-131.309 122.344-131.309z m-464.062 4.395c52.03 0 87.89 34.629 87.89 86.836 0 51.51-36.351 86.138-88.929 86.825l-1.598 0.01h-47.461V629h-53.086V375.348h103.184z m223.066 0c58.36 0 91.758 30.761 91.758 80.859 0 32.194-16.54 60.082-45.183 71.723l-0.872 0.347L596.14 629H536.02l-47.285-92.813h-42.539V629h-53.086V375.348h103.887z m240.996 39.902c-41.484 0-68.203 33.75-68.203 87.012 0 53.086 26.543 86.66 68.203 86.66 41.485 0 68.027-33.574 68.027-86.66 0-53.262-26.542-87.012-68.027-87.012z m-478.125 2.11h-36.035v90.175h35.86c30.41 0 48.163-16.172 48.163-45.176 0-28.54-17.228-44.675-47.08-44.995l-0.908-0.005z m231.504-0.528h-45.176v80.86H491.9c26.72 0 42.364-15.294 42.364-40.43 0-24.364-16.195-40.113-42.103-40.425l-0.788-0.005z"
            fill="#F73048" p-id="7833"></path>n
    </svg>
);

const ProIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ProSvg} {...props} />
);

const DefaultLayout: React.FC<PropsWithChildren<{}>> = ({children}) => {
    return (
        <Layout style={{height: '100vh'}}>
            <Header style={{display: 'flex', alignItems: 'center', background: '#fff', padding: 0, fontSize: '22px', fontWeight: '700', borderBottom: '1px solid #DDD' }}>
                {/*&emsp;星群@CHAT&ensp;<ProIcon style={{width: '24px'}}></ProIcon>*/}
                <span style={{margin: '0 12px'}}>CHAT</span>
            </Header>
            <Layout>
                <Sider style={{background: '#fff', padding: 0, borderRight: '1px solid #DDD'}}>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', padding: '12px' }}>
                        <Button style={{ width: '100%' }} type="primary">+&ensp;创建新会话</Button>
                    </div>
                </Sider>
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