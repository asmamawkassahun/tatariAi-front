"use client";

import { Button } from "@/components/ui/button";
import { HeroCard } from "@/components/hero/HeroCard";
import {
    ThumbsUp,
    ThumbsDown,
    Copy,
    Heart,
} from "lucide-react";

interface ChatMessage {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: string;
    isCancelled?: boolean;
}

interface ProjectSidebarProps {
    visible: boolean;
    chatMessages: ChatMessage[];
    isLoading: boolean;
    onSend: (input: string, attachments: any[], visibility: string) => Promise<void>;
    onVoice: () => void;
    onSupabase: () => void;
}

export function ProjectSidebar({
    visible,
    chatMessages,
    isLoading,
    onSend,
    onVoice,
    onSupabase,
}: ProjectSidebarProps) {
    return (
        <div
            className={`${visible ? "w-1/3" : "w-0"
                } border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden`}
        >
            {visible && (
                <>
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                        {chatMessages.length === 0 ? (
                            // Default messages when no chat history
                            <>
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
                            </>
                        ) : (
                            // Render actual chat messages
                            chatMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`${message.role === "user"
                                                ? "bg-gray-200 text-gray-800"
                                                : "bg-white border border-gray-200 shadow-sm"
                                            } rounded-lg px-3 py-2 max-w-xs`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Input Area */}
                    <HeroCard
                        onSend={onSend}
                        onVoice={onVoice}
                        onSupabase={onSupabase}
                        disabled={isLoading}
                    />
                </>
            )}
        </div>
    );
}
