async function fetchData(url: string, options: RequestInit) {
    try {
        const response = await fetch(url, options);

        // 手动检查响应是否成功
        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`HTTP Error: ${response.status} - ${errorDetails.message || 'Unknown error'}`);
        }

        return await response.json();
    } catch (error) {
        // 捕获网络错误或自定义错误处理
        console.error('Fetch Error:', error);
        throw error;
    }
}

export default fetchData;