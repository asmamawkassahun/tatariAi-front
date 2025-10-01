"use client";

import { Button } from "@/components/ui/button";
import { HeroCard } from "@/components/hero/HeroCard";
import {
    ThumbsUp,
    ThumbsDown,
    Copy,
    Heart,
    MoreHorizontal,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            className={`${visible ? "w-full" : "w-0"
                } border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden h-full`}
        >
            {visible && (
                <>
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-[#1A1A1A] w-full">
                        {chatMessages.length === 0 ? (
                            // Default messages when no chat history
                            <>
                                {/* User Message */}
                                <div className="flex justify-end">
                                    <div className="bg-gray-100 text-gray-800 rounded-lg px-3 py-2 max-w-xs">
                                        <p className="text-sm font-medium">hi</p>
                                    </div>
                                </div>

                                {/* AI Response */}
                                <div className="flex justify-start w-full">
                                    <div className="bg-white  px-6 py-4 w-full">
                                        <div className="flex justify-between w-full items-center gap-3 mb-4">
                                            <div> <div className="w-8 h-8 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                                                <Heart className="w-4 h-4 text-white" />
                                            </div>
                                                <h3 className="text-base font-semibold text-gray-800">
                                                    Lovable
                                                </h3>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <MoreHorizontal />
                                            </div>
                                        </div>
                                        <div className="text-base text-gray-800 leading-relaxed mb-4 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 text-yellow-500">💡</div>
                                                <span className="text-sm text-gray-500">
                                                    Thought for 12 seconds
                                                </span>
                                            </div>
                                            <div>  <p className="mb-3">
                                                Hi there! 👋 Welcome to Lovable! I&apos;m here to help you build your web application.
                                            </p>
                                                <p>
                                                    What would you like to create today? Whether it&apos;s a landing page, a dashboard, a portfolio, an e-commerce site, or something else entirely - just describe your vision and I&apos;ll bring it to life!
                                                </p></div>
                                        </div>
                                        <div className="flex items-center gap-3 justify-end  pt-3">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600">
                                                <ThumbsUp className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600">
                                                <ThumbsDown className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600">
                                                <Copy className="h-4 w-4" />
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

                    <div className="p-3 bg-white dark:bg-[#1A1A1A] w-full">  {/* Input Area */}
                        <HeroCard
                            onSend={onSend}
                            onVoice={onVoice}
                            onSupabase={onSupabase}
                            disabled={isLoading}
                        /></div>
                </>
            )}
        </div>
    );
}
