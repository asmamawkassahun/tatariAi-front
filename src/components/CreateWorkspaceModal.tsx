"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { User } from "@/types/api";
import { toast } from "sonner";

interface CreateWorkspaceModalProps {
    user: User;
    onWorkspaceCreated: () => void;
}

export function CreateWorkspaceModal({ user, onWorkspaceCreated }: CreateWorkspaceModalProps) {
    const [workspaceName, setWorkspaceName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulate API call to create a workspace
            const newWorkspace = {
                name: workspaceName,
                description: description || "",
                avatar: undefined,
                allowUnprotectedSamples: false,
                allowInvites: true,
                createdBy: user.email,
            };

            // Here you would typically call an API to create the workspace
            console.log("Creating workspace:", newWorkspace);

            // Simulate success
            toast.success(`Workspace "${workspaceName}" created successfully!`);
            onWorkspaceCreated(); // Close the modal
        } catch (error) {
            toast.error("Failed to create workspace. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className=" w-full max-w-[52.9375rem] p-8">
            <div className=" w-full max-w-[22.5rem] space-y-6">
                <div className=" space-y-3">
                    <h1 className=" text-3xl font-bold">Create New Workspace</h1>
                    <p className=" textsecondary ">
                        Set up a new workspace for your projects. You can customize it later.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="workspace-name">Workspace Name</Label>
                        <Input
                            id="workspace-name"
                            value={workspaceName}
                            onChange={(e) => setWorkspaceName(e.target.value)}
                            placeholder="Enter workspace name"
                            required
                        />
                    </div>
                   
                    <div className="flex items-center justify-center gap-12 mx-auto">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onWorkspaceCreated()}
                            disabled={isLoading}
                        >
                            Go Back
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Continue to Plan"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}