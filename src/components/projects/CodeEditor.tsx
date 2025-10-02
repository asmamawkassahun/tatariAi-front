"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, Copy, X } from "lucide-react"
import { FileItem } from "@/types/fileItem"

interface CodeEditorProps {
    file: FileItem | null
    content: string
    onContentChange: (content: string) => void
}

export function CodeEditor({ file, content, onContentChange }: CodeEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
        }
    }, [content])

    if (!file) {
        return (
            <div className="h-full bg-[#1e1e1e] flex items-center justify-center">
                <p className="text-gray-500">No file selected</p>
            </div>
        )
    }

    const lines = content.split("\n")

    return (
        <div className="h-full bg-[#1e1e1e] flex flex-col">
            {/* Tab Bar */}
            <div className="h-12 bg-[#252526] border-b border-[#2d2d30] flex items-center px-2 gap-1">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1e1e1e] border-t-2 border-[#007acc] rounded-t">
                    <span className="text-sm text-gray-300">{file.name}</span>
                    <button className="hover:bg-[#2d2d30] rounded p-0.5">
                        <X className="w-3 h-3 text-gray-400" />
                    </button>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-[#2d2d30] rounded" title="Copy">
                        <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1.5 hover:bg-[#2d2d30] rounded" title="Download">
                        <Download className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 flex overflow-hidden">
                {/* Line Numbers */}
                <div className="bg-[#1e1e1e] border-r border-[#2d2d30] px-4 py-4 select-none">
                    <div className="font-mono text-sm text-gray-500 leading-6">
                        {lines.map((_, i) => (
                            <div key={i} className="text-right">
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Code Content */}
                <ScrollArea className="flex-1">
                    <div className="relative">
                        <textarea
                            ref={textareaRef}
                            value={content}
                            onChange={(e) => onContentChange(e.target.value)}
                            className="w-full bg-transparent text-gray-300 font-mono text-sm leading-6 p-4 resize-none focus:outline-none"
                            style={{
                                minHeight: "100%",
                                tabSize: 2,
                            }}
                            spellCheck={false}
                        />
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}
