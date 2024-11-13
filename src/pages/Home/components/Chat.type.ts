export interface ChatData {
    id: number;
    content: string;
    message: string;
    timestamp: number;
    type: 'text' | 'image' | 'audio' | 'video' | 'file';
    role: 'user' | 'assistant';
}
