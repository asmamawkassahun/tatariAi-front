import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Download, Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface PeopleProps {
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

const People = ({ workspace, user }: PeopleProps) => {

    const [isMobile, setIsMobile] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");


    // Mock data for people section
    const members = [
        {
            id: 1,
            name: "Adams Lovable",
            email: "Adamsdan@gmail.com",
            role: "Owner",
            avatar: "A",
            status: "active"
        }
    ];

    const usageData = [
        { name: "Adam's Lovable", credits: 2, description: "Total usage across all months." },
        { name: "Adam's Lovable", credits: 3, description: "Total usage across all months." }
    ];


    const handleInvite = () => {
        if (inviteEmail) {
            console.log("Inviting:", inviteEmail);
            setInviteEmail("");
            // Add invite logic here
        }
    };

    return (
        <div className="space-y-8">
            {
                !isMobile && (
                    <div>
                        <h2 className="text-2xl font-semibold text-primary dark:text-accent">People</h2>
                        <p className="text-secondary dark:text-muted mt-1">
                            Inviting people to {user.firstName}'s Lovable gives access to workspace shared projects and credits.
                            You have {members.length} people in this workspace.
                        </p>
                    </div>
                )
            }

            {/* Invite Section */}
            <div className="rounded-lg">
                <h3 className="text-lg text-primary dark:text-accent font-semibold mb-4">Invite new members</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                        placeholder="Add emails"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="flex-1"
                    />
                    <Button onClick={handleInvite} className="sm:w-auto dark:bg-accent dark:hover:bg-accent/80">
                        <Plus className="h-4 w-4 mr-2" />
                        Invite
                    </Button>
                </div>
            </div>

            {/* Members Header */}
            <div className="flex flex-col space-y-2.5">
                <div className="flex justify-between sm:w-auto mb-2.5">
                    <h3 className="text-lg text-primary dark:text-accent font-semibold">Members</h3>
                    <Button size="sm" className="sm:flex-none dark:bg-accent dark:hover:bg-accent/80">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 shadow-none text-gray-400" />
                    <Input
                        placeholder="Search"
                        className="pl-8"
                    />
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="">
                <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-4">
                    {members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-primary dark:bg-accent text-accent dark:text-primary">
                                        {member.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold text-primary dark:text-accent">{member.name}</div>
                                    <div className="text-sm text-secondary dark:text-muted">{member.email}</div>
                                </div>
                            </div>
                            <Badge variant={member.role === "Owner" ? "default" : "secondary"} className=" dark:bg-accent">
                                {member.role}
                            </Badge>
                        </div>
                    ))}
                </TabsContent>

                <TabsContent value="active" className="space-y-4 mt-4">
                    {members.filter(m => m.status === "active").map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-primary dark:bg-accent text-accent dark:text-primary">
                                        {member.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold text-primary dark:text-accent">{member.name}</div>
                                    <div className="text-sm text-secondary dark:text-muted">{member.email}</div>
                                </div>
                            </div>
                            <Badge variant={member.role === "Owner" ? "default" : "secondary"} className=" dark:bg-accent">
                                {member.role}
                            </Badge>
                        </div>
                    ))}
                </TabsContent>

                <TabsContent value="pending" className="space-y-4 mt-4">
                    <div className="text-center py-8 text-secondary dark:text-muted">
                        No pending invitations
                    </div>
                </TabsContent>
            </Tabs>

            {/* Usage Section */}
            <div className="mt-8">
                <h3 className="text-xl text-primary dark:text-accent font-semibold mb-4">Usage</h3>

                <div className="flex flex-col gap-4">
                    {usageData.map((usage, index) => (
                        <div key={index} className="flex justify-between">
                            <div className="flex flex-col gap-2 pb-3 w-full">
                                <p className="text-base text-secondary dark:text-muted">{usage.description}</p>
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className="bg-primary dark:bg-accent text-accent dark:text-primary">
                                                {usage.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="text-lg md:text-xl font-medium text-primary dark:text-accent">{usage.name}</p>
                                    </div>
                                    <p className="text-lg md:text-xl font-medium text-secondary dark:text-muted">{usage.credits} credits used</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default People