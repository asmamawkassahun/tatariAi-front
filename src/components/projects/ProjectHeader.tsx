"use client";

import { Button } from "@/components/ui/button";
import {
    ChevronDown,
    Clock,
    Square,
    Globe,
    Code,
    Cloud,
    Plus,
    Users,
    Github,
    Crown,
} from "lucide-react";

interface ProjectHeaderProps {
    projectName: string;
    previewStatus: string;
    sidebarVisible: boolean;
    onToggleSidebar: () => void;
}

export function ProjectHeader({
    projectName,
    previewStatus,
    sidebarVisible,
    onToggleSidebar,
}: ProjectHeaderProps) {
    return (
        <div className="w-full bg-white p-4">
            <div className="flex items-center justify-between">
                {/* Left - Project Title */}
                <div className="flex justify-between items-center gap-2 w-1/3">
                    <div className="flex items-center gap-2">
                        <h1 className="text-lg font-semibold text-gray-900">
                            {projectName}
                        </h1>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                        <p className="text-sm text-gray-500 ml-4">{previewStatus}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Clock className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={onToggleSidebar}
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
    );
}
