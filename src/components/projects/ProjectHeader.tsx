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
import History from "../icons/History";
import SidebarIcon from "../icons/SidebarIcon";

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
        <div className="w-full bg-white p-2">
            <div className="flex items-center justify-between">
                {/* Left - Project Title */}
                <div className={`flex justify-between items-center pl-2 gap-4 ${sidebarVisible ? "w-1/3" : ""}`}>
                    <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg font-semibold text-gray-900">
                                {projectName}
                            </h1>
                            <ChevronDown className="w-4 h-4 text-gray-500" /></div>
                        <p className="text-sm text-gray-500">{previewStatus}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <History />
                        </Button>
                        <Button
                            onClick={onToggleSidebar}
                            title={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                        >
                            <SidebarIcon />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-1 justify-between items-center gap-4 px-3">  {/* Center - Icons */}
                    <div className="flex flex-1 items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-blue-100 text-black border-blue-600"
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
                    </div></div>
            </div>
        </div>
    );
}
