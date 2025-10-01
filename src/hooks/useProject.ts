import { useState, useEffect } from "react";
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

    // Handlers
    const handleSend = async (
        input: string,
        attachments: any[],
        visibility: string
    ) => {
        if (!input.trim()) return;

        setIsLoading(true);
        try {
            console.log("Sending message:", { input, attachments, visibility });

            const response = await chatService.sendAIChat({
                message: input,
            });

            console.log("AI Chat Response:", response);

            if (response.success && response.data.success) {
                // If this is a new project creation, redirect to project page
                if (response.data.projectId && !response.data.messageId) {
                    console.log("Redirecting to new project:", response.data.projectId);
                    router.push(`/projects/${response.data.projectId}`);
                } else {
                    // If this is a continuation of existing project, redirect to project page
                    if (response.data.projectId) {
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
            } else {
                console.error("Network error. Please check your connection.");
            }

            // TODO: Show error toast/notification
        } finally {
            setIsLoading(false);
        }
    };

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

    // Fetch project data
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            window.location.href = "/login";
            return;
        }

        if (isAuthenticated && projectId) {
            const fetchProject = async () => {
                try {
                    setProjectLoading(true);
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

            fetchProject();
        }
    }, [isAuthenticated, loading, projectId, user]);

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
