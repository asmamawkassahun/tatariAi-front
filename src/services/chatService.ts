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

export interface AIChatRequest {
    message: string;
    projectId?: string;
}

export interface AIChatResponse {
    success: boolean;
    message: string;
    data: {
        success: boolean;
        chatId: string;
        messageId: string;
        aiResponse: string;
        projectId?: string;
        previewUrl?: string;
        tokenUsage: {
            promptTokens: number;
            completionTokens: number;
            totalTokens: number;
        };
        cost: number;
        fileOperations?: {
            success: boolean;
            writtenFiles: string[];
            renamedFiles: string[];
            deletedFiles: string[];
            addedDependencies: string[];
            errors: string[];
            warnings: string[];
            commitHash: string;
        };
    };
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

    /**
     * Get chat messages by project ID
     */
    async getChatMessagesByProject(projectId: string): Promise<ChatMessage[]> {
        try {
            const response = await api.get(`${API_ENDPOINTS.PROJECTS.BASE}/${projectId}/chat/messages`);
            return response.data.messages || [];
        } catch (error: any) {
            console.error('Error fetching chat messages by project:', error);

            // Handle rate limiting specifically
            if (error.response?.status === 429) {
                console.warn('Rate limited while fetching chat messages, retrying...');
                // Wait and retry once
                await new Promise(resolve => setTimeout(resolve, 2000));
                try {
                    const retryResponse = await api.get(`${API_ENDPOINTS.PROJECTS.BASE}/${projectId}/chat/messages`);
                    return retryResponse.data.messages || [];
                } catch (retryError) {
                    console.error('Retry failed for chat messages:', retryError);
                    return [];
                }
            }

            // Return empty array if no messages found or error occurs
            return [];
        }
    }

    /**
     * Send AI chat request
     */
    async sendAIChat(data: AIChatRequest): Promise<AIChatResponse> {
        try {
            const fullUrl = `${this.baseUrl}${API_ENDPOINTS.CHAT.BASE}`;
            console.log('Sending AI chat request to:', fullUrl);
            console.log('With data:', data);
            console.log('Base URL:', this.baseUrl);
            console.log('Endpoint:', API_ENDPOINTS.CHAT.BASE);

            const response = await api.post(API_ENDPOINTS.CHAT.CREATE, data, {
                timeout: 300000, // 5 minutes timeout
            });
            console.log('Response received:', response.data);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Error sending AI chat:', error);

            // Handle rate limiting specifically
            if (error.response?.status === 429) {
                console.warn('Rate limited while sending AI chat, retrying...');
                // Wait and retry once
                await new Promise(resolve => setTimeout(resolve, 3000));
                try {
                    const retryResponse = await api.post(API_ENDPOINTS.CHAT.CREATE, data, {
                        timeout: 300000, // 5 minutes timeout
                    });
                    return retryResponse.data;
                } catch (retryError) {
                    console.error('Retry failed for AI chat:', retryError);
                    throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
                }
            }

            // Handle timeout specifically
            if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                console.error('Request timed out after 5 minutes');
                throw new Error('Request timed out. The server is taking too long to respond. Please try again.');
            }

            // Handle network errors
            if (error.code === 'ERR_NETWORK' || !error.response) {
                console.error('Network error - server may be down or unreachable');
                throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
            }

            console.error('Error details:', {
                message: error.message,
                code: error.code,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                url: error.config?.url,
                baseURL: error.config?.baseURL
            });
            throw error;
        }
    }
}

export const chatService = new ChatService();
export default chatService;
