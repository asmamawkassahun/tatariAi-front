"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ChevronDown, Square, Globe, Code, Cloud, Plus, Users, Github, Crown, Sun, Moon, MonitorSmartphone, Check, Settings, HelpCircle, Gift, ChevronLeft, ArrowUpRight, Monitor, ChevronRight } from "lucide-react"
import SidebarIcon from "../icons/SidebarIcon"
import History from "../icons/History"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { SupabaseIcon } from "../icons"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { WorkspaceSettingsModal } from "@/components/setting/workspace-settings-modal"
import ReferralModal from "../ReferralModal"


interface ProjectHeaderProps {
    projectName: string
    previewStatus: string
    sidebarVisible: boolean
    activeView: "code" | "preview"
    onToggleSidebar: () => void
    onToggleView: (view: "code" | "preview") => void
}

export function ProjectHeader({ projectName, previewStatus, sidebarVisible, activeView, onToggleSidebar, onToggleView }: ProjectHeaderProps) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
    const [initialSection, setInitialSection] = React.useState("workspace");
    const [referralModalOpen, setReferralModalOpen] = React.useState(false);


    React.useEffect(() => {
        setMounted(true)
    }, [])

    const pushSettingsParam = (section: string) => {
        try {
            const params = new URLSearchParams(searchParams?.toString());
            params.set("settings", section);
            router.push(`${pathname}?${params.toString()}`);
        } catch {
            // noop
        }
    };

    const handleOpenPlansBilling = () => {
        const section = "plans-billing";
        setInitialSection(section);
        setIsSettingsOpen(true);
        pushSettingsParam(section);
    };

    const handleOpenProjectSettings = () => {
        const section = "project";
        setInitialSection(section);
        setIsSettingsOpen(true);
        pushSettingsParam(section);
    };

    const handleGiftClick = () => {
        setReferralModalOpen(true);
      };

    return (
        <div className="w-full bg-white p-2">
            <div className="flex items-center justify-between">
                {/* Left - Project Title */}
                <div className={`flex justify-between items-center pl-2 gap-4 ${sidebarVisible ? "w-1/3" : ""}`}>
                    <div className="flex flex-col items-start">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 cursor-pointer">
                                    <h1 className="text-lg font-semibold text-gray-900">{projectName}</h1>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" sideOffset={8} className="bg-background border-border py-3 px-2.5 shadow-lg w-[320px]">
                                {/* Top Go to Dashboard */}
                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <Link href="/" className=" inline-flex items-center">
                                        <ChevronLeft className="h-4 w-4 inline mr-2" />
                                        <span>Go to Dashboard</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />

                                {/* Workspace header and credits */}
                                <div className="px-2 text-[13px] text-muted">
                                    {user?.firstName ? `${user.firstName}'s Lovable` : "My Lovable"}
                                </div>
                                <div className="mx-2 my-2 rounded-md border bg-muted/20 p-3">
                                    <Button className="flex items-center bg-muted/0 w-full !px-0 hover:bg-muted/0 hover:text-white justify-between text-sm cursor-pointer" onClick={handleOpenPlansBilling}>
                                        <span className="font-medium text-primary dark:text-accent">Credits</span>
                                        <div className="flex items-center text-secondary  dark:text-muted gap-2">
                                            <span className="text-muted">4.5 left</span>
                                            <ChevronRight className="h-4 w-4 inline " />
                                        </div>
                                    </Button>
                                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                                        <div className="h-2 rounded-full bg-blue-600" style={{ width: "75%" }} />
                                    </div>
                                    <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                                        <span className="inline-block size-2 rounded-full bg-muted-foreground" />
                                        Daily credits reset at midnight UTC
                                    </div>
                                </div>

                                {/* Actions */}
                                <DropdownMenuItem onClick={handleGiftClick} className="flex items-center gap-2 cursor-pointer">
                                    <Gift className="h-4 w-4" />
                                    <span>Get free credits</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={handleOpenProjectSettings}>
                                    <Settings className="h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <Square className="h-4 w-4" />
                                    <span>Rename project</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger className="flex items-center gap-2 cursor-pointer">
                                        <Monitor className="h-4 w-4" />
                                        <span>Appearance</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => setTheme("light")}>
                                            <Sun className="h-4 w-4" />
                                            <span>Light</span>
                                            {mounted && theme === "light" && <Check className="h-4 w-4 ml-auto" />}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => setTheme("dark")}>
                                            <Moon className="h-4 w-4" />
                                            <span>Dark</span>
                                            {mounted && theme === "dark" && <Check className="h-4 w-4 ml-auto" />}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => setTheme("system")}>
                                            <MonitorSmartphone className="h-4 w-4" />
                                            <span>System</span>
                                            {mounted && theme === "system" && <Check className="h-4 w-4 ml-auto" />}
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>

                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <HelpCircle className="h-4 w-4" />
                                    <span>Help</span>
                                    <ArrowUpRight className="h-4 w-4 ml-auto" />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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

                <div className="flex flex-1 justify-between items-center gap-4 px-3">
                    {" "}
                    {/* Center - Icons */}
                    <div className="flex flex-1 items-center gap-1">
                        <Button
                            variant="outline"
                            size="sm"
                            className={`${activeView === "preview" ? "bg-blue-100 hover:bg-blue-100/50 border-blue-600" : " text-black "} hover:text-primary`}
                            onClick={() => onToggleView("preview")}
                        >
                            <Globe className="w-4 h-4 mr-2" />
                            <span className={`${activeView === "preview" ? "block" : "hidden"}`}>Preview</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className={`${activeView === "code" ? "bg-blue-100 hover:bg-blue-100/50 border-blue-600 " : " text-black border-footer-border"} hover:text-primary`}
                            onClick={() => onToggleView("code")}
                        >
                            <Code className="w-4 h-4 mr-2" />
                            <span className={`${activeView === "code" ? "block" : "hidden"}`}>Code</span>
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 hover:text-primary">
                            <Cloud className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-primary">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                    {/* Right - Action Buttons */}

                    <div className="flex items-center gap-2">
                        <div className="flex items-center ">

                            <Avatar className="h-10 w-10">
                                {user?.photoUrl ? (
                                    <img
                                        src={user.photoUrl}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <AvatarFallback className="text-xl bg-primary dark:bg-accent text-accent dark:text-primary">
                                        {user?.firstName ? user.firstName.charAt(0).toUpperCase() :
                                            user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                                    </AvatarFallback>
                                )}
                            </Avatar>

                            <Button className="  h-10 bg-accent hover:bg-muted text-primary rounded-full border border-accent -ml-3 z-1 cursor-pointer ">
                                <Users className="w-4 h-4 mr-2" />
                                Invite
                            </Button>
                        </div>
                        <Button variant="ghost" size="sm" className=" bg-accent h-9 w-9 p-0 border-footer-border cursor-pointer">
                            <SupabaseIcon />
                        </Button>
                        <Button variant="outline" size="sm" className=" bg-accent hover:bg-accent/50 text-primary hover:text-primary h-9 w-9 p-0 border-footer-border cursor-pointer">
                            <Github className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-accent text-primary border-footer-border hover:bg-accent/50 hover:text-primary cursor-pointer">
                            <Crown className="w-4 h-4 mr-2" />
                            Upgrade
                        </Button>
                        <Button size="sm" className="bg-primary text-accent cursor-pointer">
                            Publish
                        </Button>
                    </div>
                </div>
            </div>
            {/* Settings Modal for Plans & Billing and other sections */}
            <WorkspaceSettingsModal
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}
                workspace={{
                    name: `${user?.firstName ? user.firstName : "User"}'s lovable`,
                    description: "A workspace for building amazing applications",
                    avatar: undefined,
                    allowUnprotectedSamples: true,
                    allowInvites: false,
                }}
                user={{ firstName: user?.firstName || "User", email: user?.email || "" }}
                initialSection={initialSection}
            />

            {/* Referral Modal */}
      <ReferralModal open={referralModalOpen} onOpenChange={setReferralModalOpen} />
        </div>
    )
}
