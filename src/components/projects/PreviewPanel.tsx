"use client";

import { Heart, MessageCircle, Upload } from "lucide-react";

interface PreviewPanelProps {
    sidebarVisible: boolean;
    isLoading: boolean;
}

export function PreviewPanel({ sidebarVisible, isLoading }: PreviewPanelProps) {
    return (
        <div
            className={`${sidebarVisible ? "flex-1" : "w-full"
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
                    <p className="text-lg text-gray-600 mb-8">
                        {isLoading ? "Spinning up preview" : "Preview ready"}
                    </p>

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
    );
}
