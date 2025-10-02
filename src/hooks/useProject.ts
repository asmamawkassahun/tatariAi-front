import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";
import { chatService } from "@/services/chatService";

interface Project {
    id: string;
    name: string;
    description: string;
    status: "active" | "completed" | "draft";
    createdAt: string;
    updatedAt: string;
    owner: {
        name: string;
        email: string;
    };
}

interface ChatMessage {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: string;
    isCancelled?: boolean;
}

export function useProject(projectId: string) {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    // Project state
    const [project, setProject] = useState<Project | null>(null);
    const [projectLoading, setProjectLoading] = useState(true);

    // UI state
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [previewLoading, setPreviewLoading] = useState(true);

    // Chat state
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // Rate limiting and debouncing
    const lastRequestTime = useRef<number>(0);
    const requestTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const RATE_LIMIT_DELAY = 1000; // 1 second between requests

    // Debounced API call function
    const debouncedApiCall = useCallback((apiCall: () => Promise<void>, delay: number = 500) => {
        // Clear existing timeout
        if (requestTimeoutRef.current) {
            clearTimeout(requestTimeoutRef.current);
        }

        // Check rate limiting
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime.current;
        
        if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
            const remainingDelay = RATE_LIMIT_DELAY - timeSinceLastRequest;
            console.log(`⏳ Rate limiting: waiting ${remainingDelay}ms before next request`);
            
            requestTimeoutRef.current = setTimeout(() => {
                lastRequestTime.current = Date.now();
                apiCall();
            }, remainingDelay);
        } else {
            lastRequestTime.current = now;
            apiCall();
        }
    }, [RATE_LIMIT_DELAY]);

    // Handlers
    const handleSend = useCallback(async (
        input: string,
        attachments: any[],
        visibility: string
    ) => {
        if (!input.trim()) return;

        // Add user message to chat immediately
        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            content: input,
            role: "user",
            timestamp: new Date().toISOString(),
        };

        setChatMessages(prev => [...prev, userMessage]);

        // Debounce the API call
        debouncedApiCall(async () => {
            setIsLoading(true);
            try {
                console.log("Sending message:", { input, attachments, visibility });

                const response = await chatService.sendAIChat({
                    message: input,
                    projectId: projectId,
                });

                console.log("AI Chat Response:", response);

                if (response.success && response.data.success) {
                    // Add AI response to chat
                    const aiMessage: ChatMessage = {
                        id: response.data.messageId || `ai-${Date.now()}`,
                        content: response.data.aiResponse || response.message,
                        role: "assistant",
                        timestamp: new Date().toISOString(),
                    };

                    setChatMessages(prev => [...prev, aiMessage]);

                    // If this is a new project creation, redirect to project page
                    if (response.data.projectId && !response.data.messageId) {
                        console.log("Redirecting to new project:", response.data.projectId);
                        router.push(`/projects/${response.data.projectId}`);
                    } else {
                        // If this is a continuation of existing project, redirect to project page
                        if (response.data.projectId && response.data.projectId !== projectId) {
                            console.log(
                                "Redirecting to existing project:",
                                response.data.projectId
                            );
                            router.push(`/projects/${response.data.projectId}`);
                        }
                    }
                } else {
                    console.error("API returned unsuccessful response:", response);
                    // TODO: Show error toast/notification
                }
            } catch (error: any) {
                console.error("Error sending message:", error);

                // Show user-friendly error message based on error type
                if (error.message?.includes("timeout")) {
                    console.error(
                        "Request timed out. The server is taking too long to respond."
                    );
                } else if (error.message?.includes("Unable to connect")) {
                    console.error(
                        "Unable to connect to the server. Please check your connection."
                    );
                } else if (error.response?.status === 404) {
                    console.error(
                        "API endpoint not found. Please check if the server is running."
                    );
                } else if (error.response?.status >= 500) {
                    console.error("Server error. Please try again later.");
                } else if (error.response?.status === 429) {
                    console.error("Rate limit exceeded. Please wait a moment before trying again.");
                } else {
                    console.error("Network error. Please check your connection.");
                }

                // TODO: Show error toast/notification
            } finally {
                setIsLoading(false);
            }
        });
    }, [projectId, router, debouncedApiCall]);

    const handleVoice = () => {
        console.log("Voice input triggered");
        // TODO: Implement voice input logic
    };

    const handleSupabase = () => {
        console.log("Supabase integration triggered");
        // TODO: Implement Supabase integration
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    // Fetch project data and chat messages
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            window.location.href = "/login";
            return;
        }

        if (isAuthenticated && projectId) {
            const fetchProjectAndChat = async () => {
                try {
                    setProjectLoading(true);
                    setChatMessages([]); // Clear existing messages

                    // Replace with actual API call
                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    // Mock project data
                    const mockProject: Project = {
                        id: projectId,
                        name: "talk-react-magic",
                        description:
                            "A React application with AI-powered development capabilities",
                        status: "active",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        owner: {
                            name: user?.firstName || "User",
                            email: user?.email || "user@example.com",
                        },
                    };

                    setProject(mockProject);

                    // Debounce chat messages fetch to prevent rate limiting
                    debouncedApiCall(async () => {
                        try {
                            const messages = await chatService.getChatMessagesByProject(projectId);
                            setChatMessages(messages);
                            console.log("Loaded chat messages:", messages);
                        } catch (chatError) {
                            console.error("Failed to fetch chat messages:", chatError);
                            // Keep empty array if chat fetch fails
                        }
                    });

                    // Simulate preview loading
                    setTimeout(() => {
                        setPreviewLoading(false);
                    }, 2000);
                } catch (error) {
                    console.error("Failed to fetch project:", error);
                } finally {
                    setProjectLoading(false);
                }
            };

            fetchProjectAndChat();
        }
    }, [isAuthenticated, loading, projectId, debouncedApiCall]); // Removed 'user' from dependencies to prevent unnecessary re-renders

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            if (requestTimeoutRef.current) {
                clearTimeout(requestTimeoutRef.current);
            }
        };
    }, []);

    return {
        // State
        project,
        projectLoading,
        sidebarVisible,
        previewLoading,
        chatMessages,
        isLoading,
        isAuthenticated,
        loading,

        // Handlers
        handleSend,
        handleVoice,
        handleSupabase,
        toggleSidebar,
    };
}
