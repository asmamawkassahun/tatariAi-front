"use client";

import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Share, Download } from "lucide-react";

interface Project {
    id: string;
    name: string;
    description: string;
    status: "active" | "completed" | "draft";
    createdAt: string;
    updatedAt: string;
    owner: {
        name: string;
        email: string;
    };
}

export default function ProjectPage() {
    const params = useParams();
    const { user, isAuthenticated, loading } = useAuth();
    const [project, setProject] = useState<Project | null>(null);
    const [projectLoading, setProjectLoading] = useState(true);

    const projectId = params.id as string;

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            window.location.href = "/login";
            return;
        }

        if (isAuthenticated && projectId) {
            // Simulate API call to fetch project
            const fetchProject = async () => {
                try {
                    setProjectLoading(true);
                    // Replace with actual API call
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Mock project data
                    const mockProject: Project = {
                        id: projectId,
                        name: "Sample Project",
                        description: "This is a sample project description. It contains details about the project goals, requirements, and current progress.",
                        status: "active",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        owner: {
                            name: user?.displayName || "User",
                            email: user?.email || "user@example.com"
                        }
                    };

                    setProject(mockProject);
                } catch (error) {
                    console.error("Failed to fetch project:", error);
                } finally {
                    setProjectLoading(false);
                }
            };

            fetchProject();
        }
    }, [isAuthenticated, loading, projectId, user]);

    if (loading || projectLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">
                                {project?.name || "Project"}
                            </h1>
                            <p className="text-muted-foreground">
                                Project ID: {projectId}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Share className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </Button>
                    </div>
                </div>

                {/* Project Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    {project?.description || "No description available."}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <div>
                                            <p className="text-sm font-medium">Project created</p>
                                            <p className="text-xs text-muted-foreground">
                                                {project?.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Unknown"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <div>
                                            <p className="text-sm font-medium">Last updated</p>
                                            <p className="text-xs text-muted-foreground">
                                                {project?.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : "Unknown"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                                    <div className="mt-1">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project?.status === "active"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                            : project?.status === "completed"
                                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                                : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                                            }`}>
                                            {project?.status || "Unknown"}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Owner</label>
                                    <p className="text-sm font-medium">{project?.owner?.name || "Unknown"}</p>
                                    <p className="text-xs text-muted-foreground">{project?.owner?.email || "Unknown"}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" className="w-full justify-start">
                                    Edit Project
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    Duplicate
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    Archive
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
