// components/workspace-settings-modal.tsx
"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Upload, Save, X, ArrowLeft, FlaskConical, Database, Github, User, CreditCard, Users } from "lucide-react";
import { SettingsSidebar } from "./settings-sidebar";

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
}

export function WorkspaceSettingsModal({
    open,
    onOpenChange,
    workspace,
    user
}: WorkspaceSettingsModalProps) {
    const [activeSection, setActiveSection] = React.useState("workspace");
    const [name, setName] = React.useState(workspace.name);
    const [description, setDescription] = React.useState(workspace.description);
    const [allowUnprotectedSamples, setAllowUnprotectedSamples] = React.useState(
        workspace.allowUnprotectedSamples
    );
    const [allowInvites, setAllowInvites] = React.useState(workspace.allowInvites);

    const workspaceName = `${user.firstName}'s Lovable`;
    const firstLetter = user.firstName.charAt(0).toUpperCase();

    const handleSave = () => {
        // Handle save logic here
        console.log("Saving workspace settings:", {
            name,
            description,
            allowUnprotectedSamples,
            allowInvites,
        });
        onOpenChange(false);
    };

    const renderContent = () => {
        switch (activeSection) {
            case "workspace":
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold text-primary dark:text-white">Workspace Setings</h2>
                            <p className="text-secondary mt-1">Allow sharing sample data from unprotected database tables when analyzing security vulnerabilities.</p>
                        </div>

                        {/* <Separator /> */}

                        {/* Workspace Avatar Section */}
                        <div className=" grid grid-cols-2 items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-primary ">Workspace Avatar</h3>
                                <p className=" text-base text-secondary">Set an avatar for your workspace.</p>
                            </div>
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={workspace.avatar} />
                                <AvatarFallback className="text-lg bg-primary text-accent">
                                    {firstLetter}
                                </AvatarFallback>
                            </Avatar>
                            {/* <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Avatar
                                </Button> */}
                        </div>

                        {/* <Separator /> */}

                        {/* Workspace Name */}
                        <div className="grid grid-cols-2 ">
                            <div>
                                <Label htmlFor="workspace-name" className="text-lg font-semibold">
                                    Workspace Name
                                </Label>
                                <p className="text-base text-secondary">Your full workspace name, as visible to others.</p>
                            </div>
                            <Input
                                id="workspace-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your full workspace name, as visible to others."
                                className="max-w-md bg-accent"
                            />
                        </div>

                        {/* Workspace Description */}
                        <div className=" grid grid-cols-2 ">
                            <div>
                                <Label htmlFor="workspace-description" className="text-lg font-semibold">
                                    Workspace Description
                                </Label>
                                <p className="text-secondary">A short description about your workspace or team.</p>
                            </div>
                            <Textarea
                                id="workspace-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="A short description about your workspace or team."
                                rows={3}
                                className="max-w-md bg-accent resize-none"
                            />
                        </div>

                        {/* <Separator /> */}

                        {/* Security Settings */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1 max-w-md">
                                    <Label className="text-lg font-semibold">
                                        Include Unprotected Database Samples in Security Scans
                                    </Label>
                                    <p className=" text-secondary">
                                        Allow sharing sample data from unprotected database tables when analyzing security vulnerabilities.
                                    </p>
                                </div>
                                <Switch
                                    checked={allowUnprotectedSamples}
                                    onCheckedChange={setAllowUnprotectedSamples}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-1 max-w-md">
                                    <Label className="text-lg font-semibold">
                                        Allow editors to invite workspace members
                                    </Label>
                                    <p className=" text-secondary">
                                        Upgrade your plan to allow editors and viewers to invite other members to this workspace.
                                    </p>
                                </div>
                                <Switch
                                    checked={allowInvites}
                                    onCheckedChange={setAllowInvites}
                                // disabled // Disabled until plan upgrade
                                />
                            </div>
                        </div>
                    </div>
                );

            case "people":
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">People</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage workspace members</p>
                        </div>
                        <div className="text-center py-12">
                            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">People management coming soon</p>
                        </div>
                    </div>
                );

            case "plans-billing":
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Plans & Billing</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your subscription</p>
                        </div>
                        <div className="text-center py-12">
                            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Billing management coming soon</p>
                        </div>
                    </div>
                );

            case "your-account":
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Your Account</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your personal account settings</p>
                        </div>
                        <div className="text-center py-12">
                            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Account settings coming soon</p>
                        </div>
                    </div>
                );

            case "labs":
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Labs</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Experimental features</p>
                        </div>
                        <div className="text-center py-12">
                            <FlaskConical className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Experimental features coming soon</p>
                        </div>
                    </div>
                );

            case "supabase":
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Supabase</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage Supabase connection</p>
                        </div>
                        <div className="text-center py-12">
                            <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Supabase integration coming soon</p>
                        </div>
                    </div>
                );

            case "github":
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Github</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage Github integration</p>
                        </div>
                        <div className="text-center py-12">
                            <Github className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Github integration coming soon</p>
                        </div>
                    </div>
                );

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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="!max-w-7xl max-h-[90vh] overflow-hidden p-0">
                <div className="flex h-[80vh]">
                    {/* Sidebar */}
                    <SettingsSidebar
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                        workspaceName={workspaceName}
                        user={user}
                    />

                    {/* Main Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-8">
                            {renderContent()}

                            {/* Action Buttons - Only show for workspace section */}
                            {activeSection === "workspace" && (
                                <div className="flex justify-end gap-3 pt-8 mt-8 border-t">
                                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave}>
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