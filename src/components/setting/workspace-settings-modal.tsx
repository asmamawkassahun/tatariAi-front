"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save, X, Menu } from "lucide-react";
import { SettingsSidebar } from "./settings-sidebar";
import { cn } from "@/lib/utils";
import Workspace from "./workspace";
import People from "./people";
import Account from "./account";
import PlansBilling from "./plans-billing";
import Labs from "./labs";
import Supabase from "./supabase";
import Github from "./github";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProjectSettings from "./project-settings";
import Domains from "./domains";
import Knowledge from "./knowledge";

interface WorkspaceSettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    workspace: {
        name: string;
        description: string;
        avatar?: string;
        allowUnprotectedSamples: boolean;
        allowInvites: boolean;
    };
    user: {
        firstName: string;
        email: string;
    };
    initialSection?: string;
}

export function WorkspaceSettingsModal({
    open,
    onOpenChange,
    workspace,
    user,
    initialSection = "workspace"
}: WorkspaceSettingsModalProps) {
    const [activeSection, setActiveSection] = React.useState(initialSection);
    const [name, setName] = React.useState(workspace.name);
    const [description, setDescription] = React.useState(workspace.description);
    const [allowUnprotectedSamples, setAllowUnprotectedSamples] = React.useState(
        workspace.allowUnprotectedSamples
    );
    const [allowInvites, setAllowInvites] = React.useState(workspace.allowInvites);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    const workspaceName = `${user.firstName}'s Lovable`;

    // Router utilities for syncing URL query params with selected section
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    // Update active section when initialSection changes
    React.useEffect(() => {
        if (open && initialSection) {
            setActiveSection(initialSection);
        }
    }, [open, initialSection]);

    // If the modal opens with a `settings` or legacy `setting` query param, sync it to state
    React.useEffect(() => {
        if (!open) return;
        const currentParams = new URLSearchParams(searchParams?.toString());
        const urlSection = currentParams.get("settings") || currentParams.get("setting");
        if (urlSection && urlSection !== activeSection) {
            setActiveSection(urlSection);
        }
    }, [open, searchParams, activeSection]);

    // Close modal and refresh page when navigating back/forward and settings query is removed
    React.useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            const hasSettings = params.has("settings") || params.has("setting");
            if (!hasSettings && open) {
                onOpenChange(false);
                // Soft refresh the current route to reflect URL-only state change
                router.refresh();
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [open, onOpenChange, router]);

    // Check if screen is mobile size
    React.useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleSave = () => {
        console.log("Saving workspace settings:", {
            name,
            description,
            allowUnprotectedSamples,
            allowInvites,
        });
        onOpenChange(false);
    };


    const handleSectionChange = (section: string) => {
        setActiveSection(section);
        if (isMobile) {
            setIsSidebarOpen(false);
        }
        // Update the URL to use `?settings=<section>` and drop legacy `setting`
        const params = new URLSearchParams(searchParams?.toString());
        params.delete("setting");
        params.set("settings", section);
        const queryString = params.toString();
        const url = queryString ? `${pathname}?${queryString}` : pathname;
        router.replace(url);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderContent = () => {
        switch (activeSection) {
            case "workspace":
                return <Workspace workspace={workspace} user={user} />

            case "people":
                return <People workspace={workspace} user={user} />

            case "your-account":
                return <Account user={user} />

            case "plans-billing":
                return <PlansBilling />

            case "labs":
                return <Labs />
            case "supabase":
                return <Supabase />

            case "github":
                return <Github />

            // Project scoped sections
            case "project":
                return <ProjectSettings projectName={workspace.name} />
            case "domains":
                return <Domains />
            case "knowledge":
                return <Knowledge />

            default:
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Workspace Settings</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your workspace preferences</p>
                        </div>
                    </div>
                );
        }
    };

    // Close handler that also removes the settings query from the URL
    const handleDialogOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
            const params = new URLSearchParams(searchParams?.toString());
            params.delete("settings");
            params.delete("setting");
            const queryString = params.toString();
            const url = queryString ? `${pathname}?${queryString}` : pathname;
            router.replace(url);
        }
        onOpenChange(nextOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleDialogOpenChange}>
            <DialogContent className="!max-w-[90rem] h-max overflow-hidden p-0">
                <DialogHeader>
                    <DialogTitle className="sr-only">Workspace Settings</DialogTitle>
                </DialogHeader>
                <div className="flex h-[80vh] relative">
                    {/* Mobile Header with Hamburger Menu */}
                    {isMobile && (
                        <div className="absolute top-0 left-0 right-0 z-20 bg-background border-b p-4 flex items-center justify-between md:hidden">
                            <h2 className="flex text-lg text-primary dark:text-accent font-semibold">
                                Settings
                                <span className="ml-1 text-secondary dark:text-muted">/{activeSection}</span>
                            </h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleSidebar}
                                className="md:hidden"
                            >
                                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </div>
                    )}

                    {/* Sidebar */}
                    <div className={cn(
                        "flex-shrink-0 border-r bg-muted/50 transition-all duration-300 ease-in-out",
                        isMobile
                            ? `absolute left-0 top-0 bottom-0 z-10 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                            }`
                            : ""
                    )}>
                        {(() => {
                            const projectSections = ["project", "domains", "knowledge"];
                            const currentSetting = searchParams?.get("settings") || undefined;
                            const showProjectGroup = projectSections.includes(activeSection) ||
                                (currentSetting ? projectSections.includes(currentSetting) : false) ||
                                projectSections.includes(initialSection);
                            return (
                                <SettingsSidebar
                            activeSection={activeSection}
                            onSectionChange={handleSectionChange}
                            workspaceName={workspaceName}
                            user={user}
                            showProjectGroup={showProjectGroup}
                        />
                            );
                        })()}
                    </div>

                    {/* Overlay for mobile when sidebar is open */}
                    {isMobile && isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}

                    {/* Main Content */}
                    <div className={cn(
                        "flex-1 overflow-y-auto transition-all duration-300",
                        isMobile ? "pt-16" : ""
                    )}>
                        <div className="p-4 md:p-8">
                            {renderContent()}

                            {/* Action Buttons - Only show for workspace section */}
                            {activeSection === "workspace" && (
                                <div className="flex justify-end gap-3 pt-8 mt-8 border-t">
                                    <Button variant="outline" onClick={() => handleDialogOpenChange(false)}>
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                    <Button onClick={() => { handleSave(); handleDialogOpenChange(false); }}>
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}