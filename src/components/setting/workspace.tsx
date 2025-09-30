import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";

interface WorkspaceProps {
    
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



 const Workspace = ({ workspace, user }: WorkspaceProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [name, setName] = useState(workspace.name);
    const [description, setDescription] = useState(workspace.description);
    const [allowUnprotectedSamples, setAllowUnprotectedSamples] = useState(
        workspace.allowUnprotectedSamples
    );
    const [allowInvites, setAllowInvites] = useState(workspace.allowInvites);




    const firstLetter = user.firstName.charAt(0).toUpperCase();



    return (
        <div className="space-y-6">
            {!isMobile && (
                <div>
                    <h2 className="text-xl font-semibold text-primary leading-6 dark:text-accent">Workspace Settings</h2>
                    <p className="text-secondary dark:text-muted mt-1">Allow sharing sample data from unprotected database tables when analyzing security vulnerabilities.</p>
                </div>
            )}

            <div className="grid md:grid-cols-2 items-center">
                <div>
                    <h3 className="text-lg font-semibold text-primary dark:text-accent leading-6">Workspace Avatar</h3>
                    <p className="text-base text-secondary dark:text-muted">Set an avatar for your workspace.</p>
                </div>
                <Avatar className="h-16 w-16">
                    <AvatarImage src={workspace.avatar} />
                    <AvatarFallback className="text-lg bg-primary dark:bg-accent text-accent dark:text-primary">
                        {firstLetter}
                    </AvatarFallback>
                </Avatar>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                    <Label htmlFor="workspace-name" className="text-lg text-primary dark:text-accent font-semibold">
                        Workspace Name
                    </Label>
                    <p className="text-base text-secondary dark:text-muted">Your full workspace name, as visible to others.</p>
                </div>
                <Input
                    id="workspace-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full workspace name, as visible to others."
                    className="max-w-md bg-accent text-secondary dark:text-muted"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                    <Label htmlFor="workspace-description" className="text-lg font-semibold text-primary dark:text-accent">
                        Workspace Description
                    </Label>
                    <p className="text-secondary dark:text-muted">A short description about your workspace or team.</p>
                </div>
                <Textarea
                    id="workspace-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A short description about your workspace or team."
                    rows={3}
                    className="max-w-md bg-accent text-secondary dark:text-muted resize-none"
                />
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1 max-w-xl">
                        <Label className="text-lg font-semibold text-primary dark:text-accent leading-6">
                            Include Unprotected Database Samples in Security Scans
                        </Label>
                        <p className="text-secondary dark:text-muted">
                            Allow sharing sample data from unprotected database tables when analyzing security vulnerabilities.
                        </p>
                    </div>
                    <Switch
                        checked={allowUnprotectedSamples}
                        onCheckedChange={setAllowUnprotectedSamples}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-1 max-w-lg">
                        <Label className="text-lg font-semibold text-primary dark:text-accent leading-6">
                            Allow editors to invite workspace members
                        </Label>
                        <p className="text-secondary dark:text-muted">
                            Upgrade your plan to allow editors and viewers to invite other members to this workspace.
                        </p>
                    </div>
                    <Switch
                        checked={allowInvites}
                        onCheckedChange={setAllowInvites}
                        className=""
                    />
                </div>
            </div>
        </div>
    )
}

export default Workspace