"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  Upload, Save, X, ArrowLeft, FlaskConical, Database, Github, Menu, Search, Download, Plus, Check, GithubIcon } from "lucide-react";
import { SettingsSidebar } from "./settings-sidebar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SupabaseIcon } from "../icons";

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
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);
    const [inviteEmail, setInviteEmail] = React.useState("");

    // Account settings state
    const [username, setUsername] = React.useState("Adams Lovable");
    const [email, setEmail] = React.useState("Adamdan@gmail.com");
    const [accountDescription, setAccountDescription] = React.useState("Description");
    const [location, setLocation] = React.useState("Adamdan@gmail.com");
    const [websiteLink, setWebsiteLink] = React.useState("Adamdan@gmail.com");

    const workspaceName = `${user.firstName}'s Lovable`;
    const firstLetter = user.firstName.charAt(0).toUpperCase();

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

    const handleAccountSave = () => {
        console.log("Saving account settings:", {
            username,
            email,
            accountDescription,
            location,
            websiteLink,
        });
        // Add account save logic here
    };

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleInvite = () => {
        if (inviteEmail) {
            console.log("Inviting:", inviteEmail);
            setInviteEmail("");
            // Add invite logic here
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case "workspace":
                return (
                    <div className="space-y-6">
                        {!isMobile && (
                            <div>
                                <h2 className="text-xl font-semibold text-primary leading-6 dark:text-white">Workspace Settings</h2>
                                <p className="text-secondary mt-1">Allow sharing sample data from unprotected database tables when analyzing security vulnerabilities.</p>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-primary leading-6">Workspace Avatar</h3>
                                <p className="text-base text-secondary">Set an avatar for your workspace.</p>
                            </div>
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={workspace.avatar} />
                                <AvatarFallback className="text-lg bg-primary text-accent">
                                    {firstLetter}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2">
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

                        <div className="grid grid-cols-1 md:grid-cols-2">
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

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1 max-w-xl">
                                    <Label className="text-lg font-semibold leading-6">
                                        Include Unprotected Database Samples in Security Scans
                                    </Label>
                                    <p className="text-secondary">
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
                                    <Label className="text-lg font-semibold leading-6">
                                        Allow editors to invite workspace members
                                    </Label>
                                    <p className="text-secondary">
                                        Upgrade your plan to allow editors and viewers to invite other members to this workspace.
                                    </p>
                                </div>
                                <Switch
                                    checked={allowInvites}
                                    onCheckedChange={setAllowInvites}
                                />
                            </div>
                        </div>
                    </div>
                );

            case "people":
                return (
                    <div className="space-y-8">
                        {
                            !isMobile && (
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">People</h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        Inviting people to {user.firstName}'s Lovable gives access to workspace shared projects and credits.
                                        You have {members.length} people in this workspace.
                                    </p>
                                </div>
                            )
                        }

                        {/* Invite Section */}
                        <div className="rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Invite new members</h3>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Input
                                    placeholder="Add emails"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    className="flex-1"
                                />
                                <Button onClick={handleInvite} className="sm:w-auto">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Invite
                                </Button>
                            </div>
                        </div>

                        {/* Members Header */}
                        <div className="flex flex-col space-y-2.5">
                            <div className="flex justify-between sm:w-auto mb-2.5">
                                <h3 className="text-lg font-semibold">Members</h3>
                                <Button variant="outline" size="sm" className="sm:flex-none bg-background hover:bg-background/80 hover:text-primary">
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
                                                <AvatarFallback className="bg-primary text-accent">
                                                    {member.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-semibold">{member.name}</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">{member.email}</div>
                                            </div>
                                        </div>
                                        <Badge variant={member.role === "Owner" ? "default" : "secondary"}>
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
                                                <AvatarFallback className="bg-primary text-accent">
                                                    {member.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-semibold">{member.name}</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">{member.email}</div>
                                            </div>
                                        </div>
                                        <Badge variant={member.role === "Owner" ? "default" : "secondary"}>
                                            {member.role}
                                        </Badge>
                                    </div>
                                ))}
                            </TabsContent>

                            <TabsContent value="pending" className="space-y-4 mt-4">
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    No pending invitations
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Usage Section */}
                        <div className="mt-8">
                            <h3 className="text-xl text-primary font-semibold mb-4">Usage</h3>

                            <div className="flex flex-col gap-4">
                                {usageData.map((usage, index) => (
                                    <div key={index} className="flex justify-between">
                                        <div className="flex flex-col gap-2 pb-3 w-full">
                                            <p className="text-base text-secondary">{usage.description}</p>
                                            <div className="flex justify-between items-center w-full">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarFallback className="bg-primary text-accent">
                                                            {usage.name.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <p className="text-lg md:text-xl font-medium text-primary">{usage.name}</p>
                                                </div>
                                                <p className="text-lg md:text-xl font-medium text-secondary">{usage.credits} credits used</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case "your-account":
                return (
                    <div className="space-y-8">
                        {
                            !isMobile && (
                                <div>
                                    <h2 className="text-xl font-semibold text-primary dark:text-accent">Account Settings</h2>
                                    <p className="text-secondary text-base dark:text-accent mt-1">
                                        Personalize how others see and interact with you on Lovable.
                                    </p>
                                </div>
                            )
                        }

                        {/* Your Avatar Section */}
                        <div className=" grid grid-cols-1 md:grid-cols-2 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-primary">Your Avatar</h3>
                                <p className="text-secondary dark:text-accent">
                                    Your avatar is automatically generated based on your account.
                                </p>
                            </div>
                            <Avatar className="h-20 w-20">
                                <AvatarFallback className="text-xl bg-primary text-accent">
                                    {user.firstName.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>


                        {/* Username Section */}
                        <div className=" grid grid-cols-1 md:grid-cols-2 space-y-4">
                            <div>
                                <Label htmlFor="username" className="text-xl font-semibold text-primary">Username</Label>
                                <p className="text-secondary dark:text-accent">
                                    Your public identifier and public URL
                                </p>
                            </div>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Your username"
                                className="max-w-md bg-accent"
                            />
                        </div>


                        {/* Email Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4">
                            <div>
                                <Label htmlFor="email" className="text-lg font-semibold text-primary">Email</Label>
                                <p className="text-secondary dark:text-accent">
                                    Your email address for notifications and account recovery
                                </p>
                            </div>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                                className="max-w-md bg-accent"
                            />
                        </div>


                        {/* Description Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4">
                            <div>
                                <Label htmlFor="description" className="text-lg font-semibold text-primary">Description</Label>
                                <p className="text-secondary dark:text-accent">
                                    A brief description about yourself
                                </p>
                            </div>
                            <Textarea
                                id="description"
                                value={accountDescription}
                                onChange={(e) => setAccountDescription(e.target.value)}
                                placeholder="Tell others about yourself"
                                rows={3}
                                className="max-w-md resize-none bg-accent"
                            />
                        </div>


                        {/* Location Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4">
                            <div>
                                <Label htmlFor="location" className="text-lg font-semibold text-primary">Location</Label>
                                <p className="text-secondary dark:text-accent">
                                    Where you're based
                                </p>
                            </div>
                            <Input
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Your location"
                                className="max-w-md bg-accent"
                            />
                        </div>


                        {/* Link Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4">
                            <div>
                                <Label htmlFor="website" className="text-lg font-semibold text-primary">Link</Label>
                                <p className="text-secondary dark:text-accent">
                                    Add a link to your personal website or portfolio
                                </p>
                            </div>
                            <Input
                                id="website"
                                type="url"
                                value={websiteLink}
                                onChange={(e) => setWebsiteLink(e.target.value)}
                                placeholder="https://example.com"
                                className="max-w-md bg-accent"
                            />
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end gap-3 pt-6">
                            <Button variant="outline" onClick={() => onOpenChange(false)}>
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                            <Button onClick={handleAccountSave}>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </div>
                );

            case "plans-billing":
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Plans & Billing</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="bg-accent dark:bg-gray-800 border-footer-border shadow-none rounded-lg">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Pro</CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">Designed for fast-moving teams building together in real time.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">$25 per month</div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="pro-annual" />
                                        <Label htmlFor="pro-annual">Annual</Label>
                                    </div>
                                    <Button className="w-full bg-black text-white hover:bg-gray-800">Get Started</Button>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <span>100 credits / month</span>
                                        </SelectTrigger>
                                        {/* Add SelectContent and SelectItem components as needed here */}
                                        <SelectContent>
                                            <div className="p-2">
                                                <SelectItem value="100">100 credits / month</SelectItem>
                                                <SelectItem value="200">200 credits / month</SelectItem>
                                                <SelectItem value="500">500 credits / month</SelectItem>
                                                <SelectItem value="1000">1000 credits / month</SelectItem>
                                            </div>
                                        </SelectContent>
                                    </Select>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                        <li className="mb-4">Everything in Free, plus:</li>
                                        <li className="flex items-center"> <Check /> 100 monthly credits</li>
                                        <li className="flex items-center"><Check /> 5 daily credits (up to 150/month)</li>
                                        <li className="flex items-center"><Check /> Private projects</li>
                                        <li className="flex items-center"><Check /> User roles & permissions</li>
                                        <li className="flex items-center"><Check /> Custom domains</li>
                                        <li className="flex items-center"><Check /> Remove the Lovable badge</li>
                                        <li className="flex items-center"><Check /> Credit rollovers</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className=" bg-background dark:bg-gray-800 border-footer-border shadow-none rounded-lg">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Business</CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">Advanced controls and power features for growing departments</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">$50 per month</div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="business-annual" />
                                        <Label htmlFor="business-annual">Annual</Label>
                                    </div>
                                    <Button className="w-full bg-accent text-primary hover:bg-accent/80">Get Started</Button>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <span>100 credits / month</span>
                                        </SelectTrigger>
                                        {/* Add SelectContent and SelectItem components as needed here */}
                                        <SelectContent>
                                            <div className="p-2">
                                                <SelectItem value="100">100 credits / month</SelectItem>
                                                <SelectItem value="200">200 credits / month</SelectItem>
                                                <SelectItem value="500">500 credits / month</SelectItem>
                                                <SelectItem value="1000">1000 credits / month</SelectItem>
                                            </div>
                                        </SelectContent>
                                    </Select>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                        <li className="mb-4">All features in Pro, plus:</li>
                                        <li className="flex items-center"><Check /> SSO</li>
                                        <li className="flex items-center"><Check /> Personal Projects</li>
                                        <li className="flex items-center"><Check /> Opt out of data training</li>
                                        <li className="flex items-center"><Check /> Design templates</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-background dark:bg-gray-800 border-footer-border shadow-none rounded-lg">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Enterprise</CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">Built for large orgs needing flexibility, scale, and governance.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-gray-600 dark:text-gray-400">Flexible billing</div>
                                    <Button className="w-full bg-accent text-primary hover:bg-accent/80">Book a demo</Button>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                                        <li className="mb-4">Everything in Business, plus:</li>
                                        <li className="flex items-center"><Check /> Dedicated support</li>
                                        <li className="flex items-center"><Check /> Onboarding services</li>
                                        <li className="flex items-center"><Check /> Custom connections</li>
                                        <li className="flex items-center"><Check /> Group-based access control</li>
                                        <li className="flex items-center"><Check /> Custom design systems</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                );

            case "labs":
                return (
                    <div className="space-y-6">
                        <div className=" flex flex-col gap-4">
                            <h2 className="text-xl font-semibold text-primary dark:text-accent">Labs</h2>
                            <p className="text-secondary dark:text-accent">These are experimental features, that might be modified or removed.</p>
                        </div>
                        <div className=" flex items-center justify-between">
                            <div className=" flex flex-col gap-4">
                                <h2 className="text-xl font-semibold text-primary dark:text-accent">GitHub Branch Switching</h2>
                                <p className="text-secondary dark:text-accent">Select the branch to make edits to in your GitHub repository.</p>
                            </div>
                            <Switch id="pro-annual" />
                        </div>
                    </div>
                );

            case "supabase":
                return (
                    <div className="space-y-6">
                        <div className=" flex flex-col gap-4">
                            <h2 className="text-xl font-semibold text-primary dark:text-accent">Integration</h2>
                            <p className="text-secondary dark:text-accent">Integrate user authentication, data storage, and backend capabilities.</p>
                        </div>
                        <div className=" flex items-center justify-between">
                            <div className=" flex flex-col gap-4">
                                <h2 className="text-xl font-semibold text-primary dark:text-accent">Organizations</h2>
                                <p className="text-secondary dark:text-accent">Connected Supabase organizations will be accessible to all members in this workspace.</p>
                            </div>
                            <Button className="bg-primary text-accent hover:bg-primary/80"><SupabaseIcon /> <span className=" hidden sm:flex">Supabase</span></Button>
                        </div>
                    </div>
                );

            case "github":
                return (
                    <div className="space-y-6">
                        <div className=" flex flex-col gap-4">
                            <h2 className="text-xl font-semibold text-primary dark:text-accent">Integration</h2>
                            <p className="text-secondary dark:text-accent">Integrate user authentication, data storage, and backend capabilities.</p>
                        </div>
                        <div className=" flex items-center justify-between">
                            <div className=" flex flex-col gap-4">
                                <h2 className="text-xl font-semibold text-primary dark:text-accent">Connected Account</h2>
                                <p className="text-secondary dark:text-accent">Add your GitHub account to manage connected organizations.</p>
                            </div>
                            <Button className="bg-primary text-accent hover:bg-primary/80"><GithubIcon /><span className=" hidden sm:flex"> Supabase</span></Button>                        </div>
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
            <DialogContent className="!max-w-[90rem] h-max overflow-hidden p-0">
                <div className="flex h-[80vh] relative">
                    {/* Mobile Header with Hamburger Menu */}
                    {isMobile && (
                        <div className="absolute top-0 left-0 right-0 z-20 bg-background border-b p-4 flex items-center justify-between md:hidden">
                            <h2 className="flex text-lg font-semibold">
                                Settings
                                <span className="ml-1 text-gray-600">/{activeSection}</span>
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
                            ? `absolute left-0 top-0 bottom-0 z-10 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                            }`
                            : "w-64"
                    )}>
                        <SettingsSidebar
                            activeSection={activeSection}
                            onSectionChange={handleSectionChange}
                            workspaceName={workspaceName}
                            user={user}
                        />
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