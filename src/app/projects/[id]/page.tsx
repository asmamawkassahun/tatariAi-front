"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Globe,
  Cloud,
  BarChart3,
  ChevronDown,
  RotateCcw,
  FileText,
  Clock,
  Square,
  Code,
  Heart,
  MessageCircle,
  Circle,
  Pencil,
  Crown,
  Users,
  Github,
  ArrowUp,
  Upload,
} from "lucide-react";
import { chatService } from "@/services/chatService";
import { HeroCard } from "@/components/hero/HeroCard";

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

export default function ProjectPage() {
  const params = useParams();
  const { user, isAuthenticated, loading } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [projectLoading, setProjectLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const projectId = params.id as string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSend = async (
    input: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    if (isAuthenticated && projectId) {
      // Simulate API call to fetch project
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

  if (loading || projectLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col">
      {/* Top Application Header Bar */}
      <div className="w-full bg-white p-4">
        <div className="flex items-center justify-between">
          {/* Left - Project Title */}
          <div className="flex justify-between items-center gap-2 w-1/3">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-gray-900">
                hello-world-playground-125
              </h1>
              <ChevronDown className="w-4 h-4 text-gray-500" />
              <p className="text-sm text-gray-500 ml-4">
                Loading Live Preview...
              </p>
            </div>
            <div className="flex items-center gap-2">
              {" "}
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Clock className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setSidebarVisible(!sidebarVisible)}
                title={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Square className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Center - Icons */}
          <div className="flex flex-1 items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-600 text-white border-blue-600"
            >
              <Globe className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Code className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Cloud className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Right - Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-purple-600 text-white border-purple-600"
            >
              <Users className="w-4 h-4 mr-2" />
              Invite
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Github className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-purple-600 text-white border-purple-600"
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-600 text-white border-blue-600"
            >
              Publish
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Left Sidebar - Chat Area */}
        <div
          className={`${
            sidebarVisible ? "w-1/3" : "w-0"
          } border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden`}
        >
          {sidebarVisible && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-gray-200 text-gray-800 rounded-lg px-3 py-2 max-w-xs">
                    <p className="text-sm">hi</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 max-w-xs shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                        <Heart className="w-3 h-3 text-pink-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Lovable
                      </span>
                      <span className="text-xs text-gray-500">
                        Thought for 12 seconds
                      </span>
                    </div>
                    <p className="text-sm text-gray-800">
                      Hi there! 👋 Welcome to Lovable!
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <HeroCard
                onSend={handleSend}
                onVoice={handleVoice}
                onSupabase={handleSupabase}
                disabled={isLoading}
              />
            </>
          )}
        </div>

        {/* Right Panel - Preview Area */}
        <div
          className={`${
            sidebarVisible ? "flex-1" : "w-full"
          } flex flex-col transition-all duration-300`}
        >
          {/* Preview Content */}
          <div className="flex-1 flex items-center justify-center bg-[#F5F5F3]">
            <div className="text-center">
              {/* Large Heart Icon */}
              <div className="w-24 h-24 mx-auto mb-6">
                <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                  <Heart className="w-12 h-12 text-gray-500" />
                </div>
              </div>

              {/* Loading Text */}
              <p className="text-lg text-gray-600 mb-8">Spinning up preview</p>

              {/* Options */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-2 h-2 text-white" />
                  </div>
                  <span className="text-sm">Chat with AI in the sidebar</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                  <span className="text-sm">
                    Select specific elements to modify
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-4 h-4 bg-gray-400 rounded flex items-center justify-center">
                    <Upload className="w-2 h-2 text-white" />
                  </div>
                  <span className="text-sm">Upload images as a reference</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
