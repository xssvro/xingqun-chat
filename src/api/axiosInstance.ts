import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.openai.com/v1', // OpenAI API的基本URL
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_OPENAI_API_KEY`, // 使用你的OpenAI API密钥
    },
    timeout: 10000, // 设置请求超时时间
});

// 请求拦截器，可以在这里加入Token等其他验证逻辑
axiosInstance.interceptors.request.use(
    (config) => {
        // 在请求发送前做一些处理
        return config;
    },
    (error) => {
        // 请求错误处理
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data; // 可以直接返回data部分
    },
    (error) => {
        console.error("API请求出错", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
