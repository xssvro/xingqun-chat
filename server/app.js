// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 安全检查函数
function isValidUrl(url) {
    try {
        const parsedUrl = new URL(url);

        // 防止访问本地地址
        const hostname = parsedUrl.hostname;
        if (hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname.startsWith('192.168.') ||
            hostname.startsWith('10.') ||
            hostname.endsWith('.local')) {
            return false;
        }

        // 只允许常见的协议
        if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}

// 代理GET请求
app.get('/api/proxy', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing target URL' });
    }

    if (!isValidUrl(targetUrl)) {
        return res.status(403).json({ error: 'Invalid or restricted URL' });
    }

    // 提取要传递给目标的查询参数
    const queryParams = {...req.query};
    delete queryParams.url;

    try {
        const headers = {};

        // 从请求中获取认证信息
        if (req.query.apiKey) {
            headers['Authorization'] = `Bearer ${req.query.apiKey}`;
            delete queryParams.apiKey;
        }

        // 复制指定的头信息
        if (req.headers['user-agent']) {
            headers['User-Agent'] = req.headers['user-agent'];
        }

        const response = await axios.get(targetUrl, {
            headers,
            params: queryParams,
            timeout: 30000
        });

        res.json(response.data);
    } catch (error) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data || error.message;
        res.status(statusCode).json({ error: errorMessage });
    }
});

// 代理POST请求
app.post('/api/proxy', async (req, res) => {
    const { targetUrl, headers = {}, data = {} } = req.body;

    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing target URL' });
    }

    if (!isValidUrl(targetUrl)) {
        return res.status(403).json({ error: 'Invalid or restricted URL' });
    }

    try {
        const requestHeaders = { ...headers };

        // 处理API密钥
        if (req.body.apiKey) {
            requestHeaders['Authorization'] = `Bearer ${req.body.apiKey}`;
        }

        const response = await axios({
            method: req.body.method || 'POST',
            url: targetUrl,
            headers: requestHeaders,
            data: data,
            timeout: 30000
        });

        res.json(response.data);
    } catch (error) {
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data || error.message;
        res.status(statusCode).json({ error: errorMessage });
    }
});

// 生产环境下提供静态文件
if (process.env.NODE_ENV === 'production') {
    // 提供前端构建文件
    app.use(express.static(join(__dirname, 'dist')));

    // 处理所有其他请求返回index.html
    app.get('*', (req, res) => {
        res.sendFile(join(__dirname, 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});