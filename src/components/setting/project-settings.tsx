"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface ProjectSettingsProps {
    projectName?: string;
    ownerName?: string;
    createdAt?: string;
    messagesCount?: number;
    aiEditsCount?: number;
}

const ProjectSettings = ({
    projectName = "little-hey-thing",
    ownerName = "Owner",
    createdAt = new Date().toISOString().slice(0, 19).replace("T", " "),
    messagesCount = 0,
    aiEditsCount = 0,
}: ProjectSettingsProps) => {
    const [visibility, setVisibility] = React.useState<string>("public");
    const [category, setCategory] = React.useState<string>("");
    const [hideLovableBadge, setHideLovableBadge] = React.useState<boolean>(false);
    const [allowUnprotectedSamples, setAllowUnprotectedSamples] = React.useState<boolean>(false);
    const [disableAnalytics, setDisableAnalytics] = React.useState<boolean>(false);
    const [newName, setNewName] = React.useState<string>(projectName);
    const [isRenameOpen, setIsRenameOpen] = React.useState<boolean>(false);
    const [isUnpublishOpen, setIsUnpublishOpen] = React.useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = React.useState<boolean>(false);
    const [isRemixOpen, setIsRemixOpen] = React.useState<boolean>(false);
    const [isTransferOpen, setIsTransferOpen] = React.useState<boolean>(false);

    const handleRename = () => {
        // Placeholder action
        setNewName((prev) => prev.trim());
        // In a real app, call an API and refresh state here
        setIsRenameOpen(false);
        toast.success("Project renamed");
    };

    // Placeholder actions for other operations. Hook to APIs when available.
    const handleRemix = () => {
        toast("Remix started", { description: "Duplicating project..." });
    };

    const handleTransfer = () => {
        toast("Transfer", { description: "Opening transfer flow..." });
    };

    const handleUnpublish = () => {
        toast("Project unpublished");
    };

    const handleDelete = () => {
        toast.error("Project deleted");
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold text-primary dark:text-accent">Project Settings</h2>
                <p className="text-secondary dark:text-muted mt-1">Manage your project details, visibility, and preferences.</p>
            </div>

            {/* Overview */}
            <div className="space-y-4">
                <h3 className="text-base font-semibold text-primary dark:text-accent">Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-secondary dark:text-muted">
                    <div className="space-y-1">
                        <p className="text-xs text-primary dark:text-accent uppercase">Project name</p>
                        <p className="text-sm font-medium text-secondary dark:text-muted">{projectName}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-primary dark:text-accent uppercase">Owner</p>
                        <a href="#" className="text-sm font-medium text-secondary dark:text-muted hover:underline">{ownerName}</a>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-primary dark:text-accent uppercase">Created at</p>
                        <p className="text-sm font-medium text-secondary dark:text-muted">{createdAt}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-primary dark:text-accent uppercase">Messages count</p>
                        <p className="text-sm font-medium text-secondary dark:text-muted">{messagesCount}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-primary dark:text-accent uppercase">AI Edits count</p>
                        <p className="text-sm font-medium text-secondary dark:text-muted">{aiEditsCount}</p>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Project Visibility */}
            <div className="flex justify-between gap-6 items-center">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label className="text-lg font-semibold text-primary dark:text-accent">Project Visibility</Label>
                        <Badge className="bg-accent text-primary dark:bg-primary dark:text-accent">Pro</Badge>
                    </div>
                    <p className="text-secondary dark:text-muted">
                        <a href="#" className="underline">Upgrade your plan</a> to keep your project hidden and prevent others from remixing it.
                    </p>
                </div>
                <div className="">
                    <Select value={visibility} onValueChange={setVisibility}>
                        <SelectTrigger className="bg-accent text-secondary dark:text-muted min-w-[12rem]">
                            <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Project Category */}
            <div className="flex justify-between gap-6 items-center">
                <div className="space-y-2">
                    <Label className="text-lg font-semibold text-primary dark:text-accent">Project Category</Label>
                    <p className="text-secondary dark:text-muted">Categorize your project to help others find it.</p>
                </div>
                <div className="max-w-md">
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="bg-accent text-secondary dark:text-muted min-w-[12rem]">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ai">AI</SelectItem>
                            <SelectItem value="tools">Developer Tools</SelectItem>
                            <SelectItem value="productivity">Productivity</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Hide Lovable Badge */}
            <div className="flex justify-between gap-6 items-center">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label className="text-lg font-semibold text-primary dark:text-accent">Hide "Lovable" Badge</Label>
                        <Badge className="bg-accent text-primary dark:bg-primary dark:text-accent">Pro</Badge>
                    </div>
                    <p className="text-secondary dark:text-muted">
                        <a href="#" className="underline">Upgrade your plan</a> to remove the "Edit with Lovable" badge from your published work.
                    </p>
                </div>
                <div className="max-w-md flex items-center h-9">
                    <Switch checked={hideLovableBadge} onCheckedChange={setHideLovableBadge} />
                </div>
            </div>

            {/* Include Unprotected Samples */}
            <div className="flex justify-between gap-6 items-center">
                <div className="space-y-2">
                    <Label className="text-lg font-semibold text-primary dark:text-accent">Include Unprotected Database Samples in Security Scans</Label>
                    <p className="text-secondary dark:text-muted">
                        Allow including sample data from unprotected database tables when analyzing security vulnerabilities. Workspace settings may override.
                    </p>
                </div>
                <div className="max-w-md flex items-center h-9">
                    <Switch checked={allowUnprotectedSamples} onCheckedChange={setAllowUnprotectedSamples} />
                </div>
            </div>

            {/* Rename Project */}
            <div className="flex justify-between gap-6 items-center">
                <div className="space-y-2">
                    <Label htmlFor="rename" className="text-lg font-semibold text-primary dark:text-accent">Rename Project</Label>
                    <p className="text-secondary dark:text-muted">Update your project's title.</p>
                </div>
                <div className="max-w-md flex gap-2 justify-end">
                    <Button className="cursor-pointer bg-primary text-accent dark:bg-accent dark:text-primary" onClick={() => setIsRenameOpen(true)}>Rename</Button>
                </div>
            </div>

            {/* Rename Project */}
            <div className="flex justify-between gap-6 items-center">
                <div className="space-y-2">
                    <Label htmlFor="rename" className="text-lg font-semibold text-primary dark:text-accent">Remix Project</Label>
                    <p className="text-secondary dark:text-muted">Duplicate this app in a new project.</p>
                </div>
                 <div className="max-w-md flex gap-2 justify-end">
                    <Button className="cursor-pointer bg-primary text-accent dark:bg-accent dark:text-primary" onClick={() => setIsRemixOpen(true)}>Remix</Button>
                </div>
            </div>

            {/* Rename Project */}
            <div className="flex justify-between gap-6 items-center">
                <div className="space-y-2">
                    <Label htmlFor="rename" className="text-lg font-semibold text-primary dark:text-accent">Transfer</Label>
                    <p className="text-secondary dark:text-muted">Move this project to a different workspace.</p>
                </div>
                 <div className="max-w-md flex gap-2 justify-end">
                    <Button className="cursor-pointer bg-primary text-accent dark:bg-accent dark:text-primary" onClick={() => setIsTransferOpen(true)}>Transfer</Button>
                </div>
            </div>

             {/* Hide Lovable Badge */
             }
             <div className="flex justify-between gap-6 items-center">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Label className="text-lg font-semibold text-primary dark:text-accent">Disable Analytics</Label>
                    </div>
                    <p className="text-secondary dark:text-muted">
                    Disable collecting analytics data for this project.
                    </p>
                </div>
                <div className="max-w-md flex items-center h-9">
                    <Switch checked={disableAnalytics} onCheckedChange={setDisableAnalytics} />
                </div>
            </div>

            {/* Rename Project */}
            <div className="flex justify-between gap-6 items-center">
                <div className="space-y-2">
                    <Label htmlFor="rename" className="text-lg font-semibold text-primary dark:text-accent">Unpublish Project</Label>
                    <p className="text-secondary dark:text-muted">Remove public access to this project..</p>
                </div>
                 <div className="max-w-md flex gap-2 justify-end">
                    <Button className="cursor-pointer bg-primary text-accent dark:bg-accent dark:text-primary" onClick={() => setIsUnpublishOpen(true)}>Unpublish</Button>
                </div>
            </div>

            {/* Rename Project */}
            <div className="flex justify-between gap-6 items-center">
                <div className="space-y-2">
                    <Label htmlFor="rename" className="text-lg font-semibold text-primary dark:text-accent">Delete Project</Label>
                    <p className="text-secondary dark:text-muted">Update your project's title.Permanently delete this project.</p>
                </div>
                 <div className="max-w-md flex gap-2 justify-end">
                    <Button className="cursor-pointer bg-destructive text-white dark:bg-destructive/60" onClick={() => setIsDeleteOpen(true)}>Delete</Button>
                </div>
            </div>

            {/* Rename Modal */}
            <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename project</DialogTitle>
                        <DialogDescription>Give your project a new name.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-2">
                        <Label htmlFor="project-new-name">Project Name</Label>
                        <Input
                            id="project-new-name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="my-awesome-project"
                            className="bg-accent text-secondary dark:text-muted"
                        />
                        <p className="text-xs text-secondary dark:text-muted">
                            Use lowercase letters, numbers, and hyphens only. Name must start with a lowercase letter. Example: my-awesome-project
                        </p>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRenameOpen(false)}>Cancel</Button>
                        <Button onClick={handleRename}>Rename Project</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Unpublish Confirmation */}
            <Dialog open={isUnpublishOpen} onOpenChange={setIsUnpublishOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Unpublish project</DialogTitle>
                        <DialogDescription>
                            This will remove public access to "{projectName}". You can republish anytime.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsUnpublishOpen(false)}>Cancel</Button>
                        <Button onClick={() => { handleUnpublish(); setIsUnpublishOpen(false); }}>Unpublish</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Remix Confirmation */}
            <Dialog open={isRemixOpen} onOpenChange={setIsRemixOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remix project</DialogTitle>
                        <DialogDescription>
                            This will duplicate "{projectName}" into a new project in your workspace.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRemixOpen(false)}>Cancel</Button>
                        <Button onClick={() => { handleRemix(); setIsRemixOpen(false); }}>Remix Project</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Transfer Confirmation */}
            <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Transfer project</DialogTitle>
                        <DialogDescription>
                            Move "{projectName}" to a different workspace. You’ll choose the destination workspace in the next step.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsTransferOpen(false)}>Cancel</Button>
                        <Button onClick={() => { handleTransfer(); setIsTransferOpen(false); }}>Start Transfer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete project</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete "{projectName}" and all of its data.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => { handleDelete(); setIsDeleteOpen(false); }}>Delete Project</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProjectSettings;


