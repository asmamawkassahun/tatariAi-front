"use client";

import { useParams } from "next/navigation";
import { useProject } from "@/hooks/useProject";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectSidebar } from "@/components/projects/ProjectSidebar";
import { PreviewPanel } from "@/components/projects/PreviewPanel";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  const {
    project,
    projectLoading,
    sidebarVisible,
    previewLoading,
    chatMessages,
    isLoading,
    isAuthenticated,
    loading,
    handleSend,
    handleVoice,
    handleSupabase,
    toggleSidebar,
  } = useProject(projectId);

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
    <div className="bg-[#F5F5F3] dark:bg-[#1A1A1A] ">
      <div className="flex flex-col min-h-screen w-full">
        {/* Header */}
        <ProjectHeader
          projectName={project?.name || "hello-world-playground-125"}
          previewStatus={
            previewLoading ? "Loading Live Preview..." : "Preview Ready"
          }
          sidebarVisible={sidebarVisible}
          onToggleSidebar={toggleSidebar}
        />
        {/* Main Content Area */}
        <div className="flex flex-1">
          {/* Left Sidebar - Chat Area */}
          <ProjectSidebar
            visible={sidebarVisible}
            chatMessages={chatMessages}
            isLoading={isLoading}
            onSend={handleSend}
            onVoice={handleVoice}
            onSupabase={handleSupabase}
          />

          {/* Right Panel - Preview Area */}
          <PreviewPanel
            sidebarVisible={sidebarVisible}
            isLoading={previewLoading}
          />
        </div>
      </div>
    </div>
  );
}
