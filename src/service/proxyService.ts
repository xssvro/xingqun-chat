// src/services/proxyService.ts
import axios from 'axios';

const API_CONFIG_KEY = 'user_api_config';

export interface ApiConfig {
    name: string;
    url: string;
    apiKey: string;
}

// 获取保存的API配置
export const getSavedApiConfigs = (): ApiConfig[] => {
    const savedApis = localStorage.getItem(API_CONFIG_KEY);
    return savedApis
        ? JSON.parse(savedApis)
        : [
            { name: 'OpenAI', url: 'https://api.openai.com/v1/chat/completions', apiKey: '' },
            { name: 'Claude', url: 'https://api.anthropic.com/v1/messages', apiKey: '' },
            { name: 'Custom API', url: '', apiKey: '' }
        ];
};

// 保存API配置
export const saveApiConfigs = (configs: ApiConfig[]): void => {
    localStorage.setItem(API_CONFIG_KEY, JSON.stringify(configs));
};

// GET请求通过代理
export const proxyGet = async (
    targetUrl: string,
    apiKey?: string,
    params: Record<string, any> = {}
) => {
    try {
        const queryParams: Record<string, any> = {
            ...params,
            url: targetUrl,
        };

        if (apiKey) {
            queryParams.apiKey = apiKey;
        }

        const response = await axios.get('/api/proxy', { params: queryParams });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.error || error.message;
            throw new Error(errorMessage);
        }
        throw error;
    }
};

// POST请求通过代理
export const proxyPost = async (
    targetUrl: string,
    data: any,
    apiKey?: string,
    headers: Record<string, string> = {}
) => {
    try {
        const requestData = {
            targetUrl,
            data,
            apiKey,
            headers,
            method: 'POST'
        };

        const response = await axios.post('/api/proxy', requestData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.error || error.message;
            throw new Error(errorMessage);
        }
        throw error;
    }
};