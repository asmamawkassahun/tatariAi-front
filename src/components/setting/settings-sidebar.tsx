// components/settings-sidebar.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Users,
    CreditCard,
    User,
    FlaskConical,
    Database,
    Github,
    ChevronRight,
    Settings2,
    Globe,
    BookOpen
} from "lucide-react";
import { it } from "zod/v4/locales";

interface SettingsSidebarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
    workspaceName: string;
    userName?: string;
    user?: {
        firstName: string;
        email: string;
    };
    showProjectGroup?: boolean;
}

export function SettingsSidebar({
    activeSection,
    onSectionChange,
    workspaceName,
    user,
    showProjectGroup = false
}: SettingsSidebarProps) {

    const firstName = user?.firstName || "User";
    const firstChar = user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U';
    const menuSections = [
        ...(showProjectGroup
            ? [
                {
                    title: "Project",
                    items: [
                        {
                            id: "project",
                            label: "Project Settings",
                            icon: Settings2,
                            hasArrow: true
                        },
                        {
                            id: "domains",
                            label: "Domains",
                            icon: Globe,
                            hasArrow: true
                        },
                        {
                            id: "knowledge",
                            label: "Knowledge",
                            icon: BookOpen,
                            hasArrow: true
                        }
                    ]
                }
            ]
            : []),
        {
            title: "Workspace",
            items: [
                {
                    id: "workspace",
                    label: workspaceName,
                    icon: Settings2,
                    hasArrow: false
                },
                {
                    id: "people",
                    label: "People",
                    icon: Users,
                    hasArrow: true
                },
                {
                    id: "plans-billing",
                    label: "Plans & Billing",
                    icon: CreditCard,
                    hasArrow: true
                }
            ]
        },
        {
            title: "Account",
            items: [
                {
                    id: "your-account",
                    label: "Your Account",
                    icon: User,
                    hasArrow: true
                },
                {
                    id: "labs",
                    label: "Labs",
                    icon: FlaskConical,
                    hasArrow: true
                }
            ]
        },
        {
            title: "Connections",
            items: [
                {
                    id: "supabase",
                    label: "Supabase",
                    icon: Database,
                    hasArrow: true
                },
                {
                    id: "github",
                    label: "Github",
                    icon: Github,
                    hasArrow: true
                }
            ]
        }
    ];

    return (
        <div className="w-60 bg-background dark:bg-primary pt-9  border-r border-gray-200 dark:border-gray-800 h-full">
            {/* <div className="ml-4">
                <h1 className="text-lg font-medium text-secondary dark:text-muted">Workspace</h1>
            </div> */}

            <div className="space-y-8 px-4">

                {menuSections.map((section) => (
                    <div key={section.title} className="space-y-3">
                        <h3 className="text-xs font-medium text-secondary dark:text-muted uppercase tracking-wide px-3">
                            {section.title}
                        </h3>

                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;

                                return (
                                    <Button
                                        key={item.id}
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-between items-center px-3 py-2 h-auto font-normal",
                                            item.id === "workspace" ? "bg-primary  dark:bg-accent hover:bg-primary/80 hover:text-accent dark:hover:bg-accent/80 dark:hover:text-primary text-accent dark:text-primary" : " dark:text-accent dark:hover:bg-accent/10 hover:text-primary",
                                            "transition-colors  duration-200",
                                            isActive && item.id !== "workspace"
                                                ? "bg-blue-50 dark:bg-accent/10 hover:text-primary "
                                                : "  "
                                        )}
                                        onClick={() => onSectionChange(item.id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            {
                                                item.id === "workspace" ? (
                                                    <div className="w-6 h-6 rounded-md bg-accent dark:bg-primary text-primary dark:text-accent text-xl flex items-center justify-center font-medium">
                                                        {firstChar}
                                                    </div>
                                                ) :
                                                    <Icon className="h-4 w-4" />
                                            }
                                            <span className={`${item.id === "workspace" ? " text-sm font-medium" : "text-xs"}`}>{item.label}</span>
                                        </div>

                                        {item.hasArrow && (
                                            // <ChevronRight className="h-4 w-4 text-gray-400" />
                                            ""
                                        )}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}