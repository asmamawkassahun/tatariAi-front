import { API_CONFIG, API_ENDPOINTS } from '@/constants/api';
import { api } from '@/config/axiosInstance';

export interface ChatMessage {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: string;
    attachments?: Array<{
        name: string;
        url: string;
        contentType: string;
    }>;
}

export interface CreateChatRequest {
    title?: string;
    visibility?: 'public' | 'workspace' | 'personal';
    initialMessage?: string;
    attachments?: Array<{
        name: string;
        url: string;
        contentType: string;
    }>;
}

export interface CreateChatResponse {
    id: string;
    title: string;
    visibility: string;
    createdAt: string;
    updatedAt: string;
}

export interface SendMessageRequest {
    content: string;
    attachments?: Array<{
        name: string;
        url: string;
        contentType: string;
    }>;
}

export interface SendMessageResponse {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: string;
}

export interface GetChatsResponse {
    chats: Array<{
        id: string;
        title: string;
        visibility: string;
        lastMessage?: string;
        lastMessageAt?: string;
        createdAt: string;
        updatedAt: string;
    }>;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

class ChatService {
    private baseUrl = API_CONFIG.BASE_URL;

    /**
     * Create a new chat
     */
    async createChat(data: CreateChatRequest): Promise<CreateChatResponse> {
        try {
            const response = await api.post(API_ENDPOINTS.CHAT.CREATE, data);
            return response.data;
        } catch (error) {
            console.error('Error creating chat:', error);
            throw error;
        }
    }

    /**
     * Get all chats for the current user
     */
    async getChats(page = 1, limit = 10): Promise<GetChatsResponse> {
        try {
            const response = await api.get(API_ENDPOINTS.CHAT.GET_ALL, {
                params: { page, limit }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching chats:', error);
            throw error;
        }
    }

    /**
     * Get a specific chat by ID
     */
    async getChatById(chatId: string): Promise<{
        id: string;
        title: string;
        visibility: string;
        messages: ChatMessage[];
        createdAt: string;
        updatedAt: string;
    }> {
        try {
            const response = await api.get(API_ENDPOINTS.CHAT.GET_BY_ID(chatId));
            return response.data;
        } catch (error) {
            console.error('Error fetching chat:', error);
            throw error;
        }
    }

    /**
     * Send a message to a chat
     */
    async sendMessage(chatId: string, data: SendMessageRequest): Promise<SendMessageResponse> {
        try {
            const response = await api.post(
                `${API_ENDPOINTS.CHAT.BASE}/${chatId}/messages`,
                data
            );
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    /**
     * Update a chat
     */
    async updateChat(chatId: string, data: Partial<CreateChatRequest>): Promise<CreateChatResponse> {
        try {
            const response = await api.put(API_ENDPOINTS.CHAT.UPDATE_BY_ID(chatId), data);
            return response.data;
        } catch (error) {
            console.error('Error updating chat:', error);
            throw error;
        }
    }

    /**
     * Delete a chat
     */
    async deleteChat(chatId: string): Promise<void> {
        try {
            await api.delete(API_ENDPOINTS.CHAT.DELETE_BY_ID(chatId));
        } catch (error) {
            console.error('Error deleting chat:', error);
            throw error;
        }
    }

    /**
     * Search chats
     */
    async searchChats(query: string, page = 1, limit = 10): Promise<GetChatsResponse> {
        try {
            const response = await api.get(API_ENDPOINTS.SEARCH.CHAT, {
                params: { q: query, page, limit }
            });
            return response.data;
        } catch (error) {
            console.error('Error searching chats:', error);
            throw error;
        }
    }
}

export const chatService = new ChatService();
export default chatService;
