// src/main.tsx

import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from './App';
import './styles/reset.css';  // 重置样式
import './styles/App.css';     // 应用全局样式

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#F73048',  // 自定义主题色
                    borderRadius: 3,  // 自定义圆角
                },
            }}
        >
            <StrictMode>
                <Router>
                    <App />
                </Router>
            </StrictMode>
        </ConfigProvider>
    );
} else {
    console.error("Root element not found");
}