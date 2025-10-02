"use client";

import { useParams } from "next/navigation";
import { useProject } from "@/hooks/useProject";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectSidebar } from "@/components/projects/ProjectSidebar";
import { PreviewPanel } from "@/components/projects/PreviewPanel";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { FileExplorer } from "@/components/projects/FileExplorer";
import { useState } from "react";
import { FileItem } from "@/types/fileItem";
import { initialFiles } from "@/data";
import { CodeEditor } from "@/components/projects/CodeEditor";
import { StackBlitzContainer } from "@/components/projects/stackblitz-container";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [files] = useState<FileItem[]>(initialFiles)
  const [activeFile, setActiveFile] = useState<string>("src/pages/index.tsx")
  const [activeView, setActiveView] = useState<"code" | "preview">("code")
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false)
  const [fileContents, setFileContents] = useState<Record<string, string>>(() => {
    const contents: Record<string, string> = {}
    const extractContents = (items: FileItem[]) => {
      items.forEach((item) => {
        if (item.type === "file") {
          contents[item.path] = item.content
        }
        if (item.children) {
          extractContents(item.children)
        }
      })
    }
    extractContents(initialFiles)
    return contents
  })

  const handleFileSelect = (path: string) => {
    setActiveFile(path)
  }

  const handleFileChange = (path: string, content: string) => {
    setFileContents((prev) => ({
      ...prev,
      [path]: content,
    }))
  }

  const getFileByPath = (path: string): FileItem | null => {
    const findFile = (items: FileItem[]): FileItem | null => {
      for (const item of items) {
        if (item.path === path) return item
        if (item.children) {
          const found = findFile(item.children)
          if (found) return found
        }
      }
      return null
    }
    return findFile(files)
  }

  const currentFile = getFileByPath(activeFile)

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
          projectName="hi-there-friend-085"
          previewStatus={previewLoading ? "Loading Live Preview..." : "Preview Ready"}
          sidebarVisible={!isLeftPanelCollapsed}
          activeView={activeView}
          onToggleSidebar={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
          onToggleView={setActiveView}
        />
        {/* Main Content Area */}
        <ResizablePanelGroup direction="horizontal" className="flex-1 w-full">
          {/* Left Sidebar - Chat Area */}
          {!isLeftPanelCollapsed && (
            <>
              <ResizablePanel defaultSize={33.5} minSize={0} maxSize={33.5} className="">
                <ProjectSidebar
                  visible={sidebarVisible}
                  chatMessages={chatMessages}
                  isLoading={isLoading}
                  onSend={handleSend}
                  onVoice={handleVoice}
                  onSupabase={handleSupabase}
                />
              </ResizablePanel>

              <ResizableHandle className="w-[1px] bg-[#2d2d30] hover:bg-[#007acc] transition-colors" />
            </>
          )}



          {/* Code Editor or Preview Panel */}
          <ResizablePanel defaultSize={isLeftPanelCollapsed ? 100 : 66.5} minSize={30}>
            {activeView === "code" ? (
              <StackBlitzContainer files={fileContents} activeFile={activeFile} onFileChange={handleFileChange} />
            ) : (
              <PreviewPanel files={fileContents} />
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
