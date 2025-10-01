"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, ChevronDown, File, Folder, Search } from "lucide-react"
import { FileItem } from "@/types/fileItem"

interface FileExplorerProps {
    files: FileItem[]
    activeFile: string
    onFileSelect: (path: string) => void
}

export function FileExplorer({ files, activeFile, onFileSelect }: FileExplorerProps) {
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["src", "src/pages", "src/components"]))

    const toggleFolder = (path: string) => {
        setExpandedFolders((prev) => {
            const next = new Set(prev)
            if (next.has(path)) {
                next.delete(path)
            } else {
                next.add(path)
            }
            return next
        })
    }

    const renderFileTree = (items: FileItem[], depth = 0) => {
        return items.map((item) => {
            const isExpanded = expandedFolders.has(item.path)
            const isActive = activeFile === item.path

            return (
                <div key={item.path}>
                    <div
                        className={`flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-[#2a2d2e] ${isActive ? "bg-[#37373d]" : ""
                            }`}
                        style={{ paddingLeft: `${depth * 12 + 8}px` }}
                        onClick={() => {
                            if (item.type === "folder") {
                                toggleFolder(item.path)
                            } else {
                                onFileSelect(item.path)
                            }
                        }}
                    >
                        {item.type === "folder" ? (
                            <>
                                {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                )}
                                <Folder className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            </>
                        ) : (
                            <>
                                <div className="w-4" />
                                <File className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </>
                        )}
                        <span className="text-sm text-gray-300 truncate">{item.name}</span>
                    </div>
                    {item.type === "folder" && isExpanded && item.children && renderFileTree(item.children, depth + 1)}
                </div>
            )
        })
    }

    return (
        <div className="h-full bg-[#252526] flex flex-col">
            {/* Header */}
            <div className="h-12 border-b border-[#2d2d30] flex items-center justify-between px-4">
                <h2 className="text-sm font-semibold text-gray-300">Files</h2>
                <Search className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-300" />
            </div>

            {/* File Tree */}
            <ScrollArea className="flex-1">
                <div className="py-2">{renderFileTree(files)}</div>
            </ScrollArea>
        </div>
    )
}
