"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { MessageIcon } from "./icons";

interface NotificationItem {
    id: string;
    title: string;
    description: string;
    isNew?: boolean;
}

interface InboxDropdownProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const mockNotifications: NotificationItem[] = [
    {
        id: "1",
        title: "Voice mode is here",
        description:
            "Talk to Lovable naturally - describe what you want to build in speech instead of typing. Voice mode makes building apps as easy as having a conversation.",
        isNew: true,
    },
    {
        id: "2",
        title: "Voice mode is here",
        description:
            "Talk to Lovable naturally - describe what you want to build in speech instead of typing. Voice mode makes building apps as easy as having a conversation.",
        isNew: true,
    },
    {
        id: "3",
        title: "Voice mode is here",
        description:
            "Talk to Lovable naturally - describe what you want to build in speech instead of typing. Voice mode makes building apps as easy as having a conversation.",
        isNew: true,
    },
    {
        id: "4",
        title: "Voice mode is here",
        description:
            "Talk to Lovable naturally - describe what you want to build in speech instead of typing. Voice mode makes building apps as easy as having a conversation.",
        isNew: true,
    },
];

// Mock updates for "What's New" tab
const mockUpdates: NotificationItem[] = [
    {
        id: "u1",
        title: "New Theme Support",
        description: "Customize your app with new theme options.",
        isNew: true,
    },
    {
        id: "u2",
        title: "Performance Boost",
        description: "Improved app performance with the latest update.",
        isNew: false,
    },
];

export const InboxDropdown: React.FC<InboxDropdownProps> = ({
    open,
    onOpenChange,
}) => {
    const [activeTab, setActiveTab] = useState<"inbox" | "whats-new">("inbox");

    const handleClose = () => {
        onOpenChange(false);
    };

    if (!open) return null;

    return (
        <>
            {/* Backdrop with higher z-index and full coverage */}
            <div
                className="fixed inset-0 z-50 bg-black/20"
                onClick={handleClose}
            />

            {/* Dropdown Content (positioned absolutely, like DialogContent) */}
            <div
                className="absolute right-0 top-full mt-2 w-96 space-y-6 px-2.5 py-5 bg-background border border-border rounded-lg shadow-lg z-60 overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Tabs */}
                <div className="flex bg-accent rounded-t-lg p-2">
                    <Button
                        variant="ghost"
                        className={cn(
                            "flex-1 rounded-none py-3 text-sm font-medium transition-colors cursor-pointer",
                            activeTab === "inbox"
                                ? "text-primary bg-background rounded-md hover:bg-background/80 hover:text-primary"
                                : "text-secondary hover:text-secondary"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab("inbox");
                        }}
                    >
                        Inbox
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn(
                            "flex-1 rounded-none py-3 text-sm font-medium transition-colors cursor-pointer",
                            activeTab === "whats-new"
                                ? "text-primary bg-background rounded-md hover:bg-background/80 hover:text-primary"
                                : "text-secondary hover:text-secondary"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab("whats-new");
                        }}
                    >
                        What's New
                    </Button>
                </div>

                {/* Content */}
                <div className="max-h-96 overflow-y-auto">
                    {activeTab === "inbox" && (
                        <div className="p-0">
                            {mockNotifications.length === 0 ? (
                                <div
                                    className="flex flex-col items-center space-y-6 text-center text-secondary"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MessageIcon />
                                    <div>
                                        <p className="text-base font-semibold text-primary">No invites pending</p>
                                        <p className="text-base font-light text-secondary">Workspace and project invitations will appear here</p>
                                    </div>
                                </div>
                            ) : (
                                mockNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className="flex items-start gap-3 px-2 py-3 hover:bg-accent/50 transition-colors border-t border-border"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex-shrink-0 mt-1">
                                            <div
                                                className={`w-2 h-2 rounded-full mt-2 ${notification.isNew ? "bg-primary" : "bg-secondary"
                                                    }`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xl font-semibold text-primary mb-1">
                                                {notification.title}
                                            </h4>
                                            <p className="text-sm text-secondary leading-relaxed">
                                                {notification.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === "whats-new" && (
                        <div className="p-0">
                            {mockUpdates.length > 0 ? (
                                mockUpdates.map((update) => (
                                    <div
                                        key={update.id}
                                        className="flex items-start gap-3 px-2 py-3 hover:bg-accent/50 transition-colors border-t border-border"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex-shrink-0 mt-1">
                                            <div
                                                className={`w-2 h-2 rounded-full mt-2 ${update.isNew ? "bg-primary" : "bg-secondary"
                                                    }`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xl font-semibold text-primary mb-1">
                                                {update.title}
                                            </h4>
                                            <p className="text-sm text-secondary leading-relaxed">
                                                {update.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div
                                    className="p-4 text-center text-secondary"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <MessageIcon />
                                    <div>
                                        <p className="text-sm">No updates available</p>
                                        <p>Check back later for new features and improvements.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};