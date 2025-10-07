"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Download, X, ChevronLeft, ChevronRight, ChevronDown, ChevronRight as ChevronRightIcon, Folder, FolderOpen, File, Search } from "lucide-react"
import { toast } from "sonner"
import "./CodeView.css"
import { FileItem } from "@/types/fileItem"

interface CodeViewProps {
    files: Record<string, string>
    activeFile: string
    onFileChange?: (path: string, content: string) => void
    fileTree?: FileItem[]
}

export function CodeView({ files, activeFile, onFileChange, fileTree }: CodeViewProps) {
    const [isReadOnly, setIsReadOnly] = useState(true)
    const [isUpgrading, setIsUpgrading] = useState(false)
    const [showFileExplorer, setShowFileExplorer] = useState(true)
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'src/pages']))
    const [searchQuery, setSearchQuery] = useState("")
    const [openFiles, setOpenFiles] = useState<string[]>([activeFile])
    const [activeTab, setActiveTab] = useState<string>(activeFile)
    const [fileExplorerWidth, setFileExplorerWidth] = useState(256) // 64 * 4 = 256px (w-64)
    const [isResizing, setIsResizing] = useState(false)
    const codeRef = useRef<HTMLPreElement>(null)
    const resizeRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Get file extension for syntax highlighting
    const getFileExtension = (filename: string) => {
        return filename.split('.').pop()?.toLowerCase() || 'text'
    }

    // Map file extensions to Prism languages
    const getPrismLanguage = (extension: string) => {
        const languageMap: Record<string, string> = {
            'js': 'javascript',
            'jsx': 'jsx',
            'ts': 'typescript',
            'tsx': 'tsx',
            'css': 'css',
            'scss': 'scss',
            'html': 'html',
            'json': 'json',
            'md': 'markdown',
            'py': 'python',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c',
            'php': 'php',
            'rb': 'ruby',
            'go': 'go',
            'rs': 'rust',
            'xml': 'xml',
            'yaml': 'yaml',
            'yml': 'yaml',
            'sql': 'sql',
            'sh': 'bash',
            'bash': 'bash',
            'zsh': 'bash',
            'fish': 'bash',
            'ps1': 'powershell',
            'dockerfile': 'dockerfile',
            'gitignore': 'text',
            'env': 'text',
            'txt': 'text'
        }
        return languageMap[extension] || 'text'
    }

    // Get file content from file tree or files object
    const getFileContent = (filePath: string): string => {
        if (files[filePath]) {
            return files[filePath]
        }

        // Search in file tree
        const findFileInTree = (items: FileItem[]): FileItem | null => {
            for (const item of items) {
                if (item.path === filePath) return item
                if (item.children) {
                    const found = findFileInTree(item.children)
                    if (found) return found
                }
            }
            return null
        }

        if (fileTree) {
            const fileItem = findFileInTree(fileTree)
            return fileItem?.content || ''
        }

        return ''
    }

    const currentFileContent = getFileContent(activeTab)
    const fileExtension = getFileExtension(activeTab)
    const prismLanguage = getPrismLanguage(fileExtension)

    // Tab management functions
    const openFile = (filePath: string) => {
        if (!openFiles.includes(filePath)) {
            setOpenFiles(prev => [...prev, filePath])
        }
        setActiveTab(filePath)
    }

    const closeFile = (filePath: string) => {
        const newOpenFiles = openFiles.filter(file => file !== filePath)
        setOpenFiles(newOpenFiles)

        if (activeTab === filePath) {
            // If we're closing the active tab, switch to another tab
            if (newOpenFiles.length > 0) {
                setActiveTab(newOpenFiles[newOpenFiles.length - 1])
            } else {
                // No tabs left: clear active tab to remove code view
                setActiveTab("")
            }
        }
    }

    const switchToTab = (filePath: string) => {
        setActiveTab(filePath)
    }

    // Toggle file explorer when clicking files
    const toggleFileExplorer = () => {
        setShowFileExplorer(prev => !prev)
    }

    // Resize handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsResizing(true)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing) return

        const containerLeft = containerRef.current?.getBoundingClientRect().left ?? 0
        const newWidth = e.clientX - containerLeft
        const minWidth = 200
        const maxWidth = 500

        if (newWidth >= minWidth && newWidth <= maxWidth) {
            setFileExplorerWidth(newWidth)
        }
    }

    const handleMouseUp = () => {
        setIsResizing(false)
    }

    // Add event listeners for resize
    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            document.body.style.cursor = 'col-resize'
            document.body.style.userSelect = 'none'
        } else {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.body.style.cursor = ''
            document.body.style.userSelect = ''
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            document.body.style.cursor = ''
            document.body.style.userSelect = ''
        }
    }, [isResizing])


    // Load Prism.js dynamically
    useEffect(() => {
        const loadPrism = async () => {
            try {
                // Import Prism.js
                const Prism = (await import('prismjs')).default

                // Import common languages
                await import('prismjs/components/prism-javascript')
                await import('prismjs/components/prism-jsx')
                await import('prismjs/components/prism-typescript')
                await import('prismjs/components/prism-tsx')
                await import('prismjs/components/prism-css')
                await import('prismjs/components/prism-scss')
                await import('prismjs/components/prism-json')
                await import('prismjs/components/prism-markdown')
                await import('prismjs/components/prism-python')
                await import('prismjs/components/prism-java')
                await import('prismjs/components/prism-cpp')
                await import('prismjs/components/prism-c')
                await import('prismjs/components/prism-php')
                await import('prismjs/components/prism-ruby')
                await import('prismjs/components/prism-go')
                await import('prismjs/components/prism-rust')
                await import('prismjs/components/prism-yaml')
                await import('prismjs/components/prism-sql')
                await import('prismjs/components/prism-bash')
                await import('prismjs/components/prism-powershell')

                // Highlight code when component mounts or activeFile changes
                setTimeout(() => {
                    if (codeRef.current) {
                        // Clear any existing highlighting
                        const codeElement = codeRef.current.querySelector('code')
                        if (codeElement) {
                            codeElement.textContent = currentFileContent
                            Prism.highlightElement(codeElement)
                        }
                    }
                }, 100)
            } catch (error) {
                console.error('Error loading Prism.js:', error)
            }
        }

        loadPrism()
    }, [activeTab])

    // Separate effect to handle highlighting when content changes
    useEffect(() => {
        const highlightCode = async () => {
            try {
                const Prism = (await import('prismjs')).default
                if (codeRef.current) {
                    const codeElement = codeRef.current.querySelector('code')
                    if (codeElement) {
                        codeElement.textContent = currentFileContent
                        Prism.highlightElement(codeElement)
                    }
                }
            } catch (error) {
                console.error('Error highlighting code:', error)
            }
        }

        if (currentFileContent) {
            highlightCode()
        }
    }, [currentFileContent])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currentFileContent)
            toast.success('Code copied to clipboard')
        } catch (error) {
            console.error('Failed to copy code:', error)
            toast.error('Failed to copy code')
        }
    }

    const handleUpgrade = () => {
        setIsUpgrading(true)
        // Simulate upgrade process
        setTimeout(() => {
            setIsUpgrading(false)
            toast.success('Upgraded to Pro!')
        }, 2000)
    }

    const handleClose = () => {
        // This would typically close the code view or navigate back
        toast.info('Code view closed')
    }

    const handleDownload = () => {
        try {
            // Get the current file content
            const content = currentFileContent
            const fileName = activeTab.split('/').pop() || 'file'

            // Create a blob with the file content
            const blob = new Blob([content], { type: 'text/plain' })

            // Create a download link
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = fileName

            // Trigger the download
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            // Clean up the URL object
            URL.revokeObjectURL(url)

            toast.success(`Downloaded ${fileName}`)
        } catch (error) {
            console.error('Failed to download file:', error)
            toast.error('Failed to download file')
        }
    }

    const toggleFolder = (folderPath: string) => {
        setExpandedFolders(prev => {
            const newSet = new Set(prev)
            if (newSet.has(folderPath)) {
                newSet.delete(folderPath)
            } else {
                newSet.add(folderPath)
            }
            return newSet
        })
    }

    const getFileIcon = (fileName: string, isFolder: boolean) => {
        if (isFolder) {
            return <Folder className="h-4 w-4 text-blue-400" />
        }

        const extension = fileName.split('.').pop()?.toLowerCase()
        switch (extension) {
            case 'tsx':
            case 'ts':
                return <File className="h-4 w-4 text-blue-400" />
            case 'css':
                return <File className="h-4 w-4 text-pink-400" />
            case 'js':
            case 'jsx':
                return <File className="h-4 w-4 text-yellow-400" />
            case 'json':
                return <File className="h-4 w-4 text-green-400" />
            case 'html':
                return <File className="h-4 w-4 text-orange-400" />
            default:
                return <File className="h-4 w-4 text-gray-400" />
        }
    }

    const normalizedQuery = searchQuery.trim().toLowerCase()
    const hasActiveSearch = normalizedQuery.length > 0

    const filterFileTree = (items: FileItem[], query: string): FileItem[] => {
        const results: FileItem[] = []
        for (const item of items) {
            if (item.type === 'folder') {
                const matchedSelf = item.name.toLowerCase().includes(query) || item.path.toLowerCase().includes(query)
                const filteredChildren = item.children ? filterFileTree(item.children, query) : []
                if (matchedSelf || filteredChildren.length > 0) {
                    results.push({ ...item, children: filteredChildren })
                }
            } else {
                const matchedFile = item.name.toLowerCase().includes(query) || item.path.toLowerCase().includes(query)
                if (matchedFile) {
                    results.push(item)
                }
            }
        }
        return results
    }

    const renderFileTree = (items: FileItem[], level = 0) => {
        return items.map((item) => {
            const isExpanded = hasActiveSearch ? true : expandedFolders.has(item.path)
            const isActive = activeTab === item.path

            return (
                <div key={item.path}>
                    <div
                        className={`flex items-center py-1 px-2 cursor-pointer hover:bg-[#2a2d2e] rounded ${isActive ? 'bg-[#37373d] text-white' : 'text-[#cccccc]'
                            } ${openFiles.includes(item.path) ? 'text-white' : ''}`}
                        style={{ paddingLeft: `${level * 12 + 8}px` }}
                        onClick={() => {
                            if (item.type === 'folder') {
                                toggleFolder(item.path)
                            } else {
                                // Toggle file explorer if it's hidden
                                if (!showFileExplorer) {
                                    toggleFileExplorer()
                                }
                                openFile(item.path)
                                onFileChange?.(item.path, item.content)
                            }
                        }}
                    >
                        {item.type === 'folder' ? (
                            <>
                                {isExpanded ? (
                                    <ChevronDown className="h-3 w-3 mr-1 text-[#cccccc]" />
                                ) : (
                                    <ChevronRightIcon className="h-3 w-3 mr-1 text-[#cccccc]" />
                                )}
                                {isExpanded ? (
                                    <FolderOpen className="h-4 w-4 mr-2 text-blue-400" />
                                ) : (
                                    <Folder className="h-4 w-4 mr-2 text-blue-400" />
                                )}
                            </>
                        ) : (
                            <>
                                <div className="w-4 mr-1" />
                                {getFileIcon(item.name, false)}
                                <span className="ml-2" />
                            </>
                        )}
                        <span className="text-sm font-mono truncate">{item.name}</span>
                    </div>
                    {item.type === 'folder' && isExpanded && item.children && (
                        <div>
                            {renderFileTree(item.children, level + 1)}
                        </div>
                    )}
                </div>
            )
        })
    }

    return (
        <div className="flex h-full bg-[#1e1e1e] text-white" ref={containerRef}>
            {/* File Explorer Sidebar */}
            {showFileExplorer && (
                <div
                    className="bg-[#252526] border-r border-[#3e3e42] flex flex-col relative"
                    style={{ width: `${fileExplorerWidth}px` }}
                >
                    {/* Files Header */}
                    <div className="px-4 py-2 border-b border-[#3e3e42]">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[#cccccc]">Files</span>
                            <div className="flex-1" />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-[#cccccc] hover:text-white hover:bg-[#3e3e42]"
                                onClick={() => setShowFileExplorer(false)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="px-4 py-2 border-b border-[#3e3e42]">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-[#858585]" />
                            <input
                                type="text"
                                placeholder="Search files"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-6 pr-2 py-1 text-xs bg-[#3c3c3c] border border-[#3e3e42] rounded text-[#cccccc] placeholder-[#858585] focus:outline-none focus:border-[#007acc]"
                            />
                        </div>
                    </div>

                    {/* File Tree */}
                    <div className="flex-1 overflow-auto">
                        <div className="py-1">
                            {(() => {
                                const treeToRender = fileTree ? (hasActiveSearch ? filterFileTree(fileTree, normalizedQuery) : fileTree) : []
                                if (treeToRender.length === 0 && hasActiveSearch) {
                                    return (
                                        <div className="px-3 py-2 text-xs text-[#858585]">
                                            No matching files
                                        </div>
                                    )
                                }
                                return fileTree ? renderFileTree(treeToRender) : null
                            })()}
                        </div>
                    </div>

                    {/* Resize Handle */}
                    <div
                        ref={resizeRef}
                        className="absolute right-0 top-0 bottom-0 w-1 bg-transparent hover:bg-[#007acc] cursor-col-resize transition-colors"
                        onMouseDown={handleMouseDown}
                    />
                </div>
            )}

            {/* Main Code Area */}
            <div className="flex-1 flex flex-col overflow-x-auto">
                {/* Show File Explorer Button when hidden */}
                {!showFileExplorer && (
                    <div className="px-4 py-2 bg-[#2d2d30] border-b border-[#3e3e42]">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs text-[#cccccc] hover:text-white hover:bg-[#3e3e42]"
                            onClick={toggleFileExplorer}
                        >
                            <File className="h-3 w-3 mr-1" />
                            Show Files
                        </Button>
                    </div>
                )}

                {/* Header - Code Tab */}
                {/* <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d30] border-b border-[#3e3e42] {
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#cccccc]">Code</span>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs text-[#cccccc] hover:text-white hover:bg-[#3e3e42]"
                                onClick={() => setIsReadOnly(!isReadOnly)}
                            >
                                {isReadOnly ? 'Read only' : 'Editable'}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs text-[#cccccc] hover:text-white hover:bg-[#3e3e42]"
                                onClick={handleUpgrade}
                                disabled={isUpgrading}
                            >
                                {isUpgrading ? 'Upgrading...' : 'Upgrade'}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs text-[#cccccc] hover:text-white hover:bg-[#3e3e42]"
                                onClick={handleClose}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </div> */}

                {/* File Tabs */}
                <div className="flex items-center bg-[#252526] border-b border-[#3e3e42]">
                    <div className="flex items-center flex-1 overflow-x-auto">
                        {openFiles.map((filePath) => {
                            const fileName = filePath.split('/').pop() || filePath
                            const isActive = activeTab === filePath

                            return (
                                <div
                                    key={filePath}
                                    className={`group flex  items-center px-1 py-2 cursor-pointer border-r border-[#3e3e42] min-w-0 ${isActive ? 'bg-[#1e1e1e] text-white' : 'bg-[#2d2d30] text-[#cccccc] hover:bg-[#37373d]'
                                        }`}
                                    onClick={() => switchToTab(filePath)}
                                >
                                    <span className="text-sm font-mono truncate mr-2">{fileName}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`h-4 w-4 p-0 text-[#cccccc] hover:text-white hover:bg-[#3e3e42]  transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'}`}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            closeFile(filePath)
                                        }}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex items-center gap-1 px-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-[#cccccc] hover:text-white hover:bg-[#3e3e42]"
                            onClick={handleDownload}
                            title="Download file"
                        >
                            <Download className="h-3 w-3" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-[#cccccc] hover:text-white hover:bg-[#3e3e42]"
                            onClick={handleCopy}
                            title="Copy code"
                        >
                            <Copy className="h-3 w-3" />
                        </Button>
                    </div>
                </div>

                {/* Code Content */}
                {activeTab ? (
                    <div className="flex-1 relative overflow-hidden code-view">
                        <div className="absolute inset-0 overflow-auto">
                            <div className="flex">
                                {/* Line Numbers */}
                                <div className="bg-[#1e1e1e] text-[#858585] text-right px-4 py-4 select-none font-mono text-sm leading-relaxed">
                                    {currentFileContent.split('\n').map((_, index) => (
                                        <div key={index} className="h-[1.32rem] ">
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>

                                {/* Code Content */}
                                <div className="flex-1 mt-4.5">
                                    <pre
                                        ref={codeRef}
                                        className={`h-full w-full p-4 font-mono text-sm leading-relaxed`}
                                        style={{
                                            background: '#1e1e1e',
                                            color: '#d4d4d4',
                                            margin: 0,
                                            padding: '16px',
                                            overflow: 'auto'
                                        }}
                                    >
                                        <code className={`language-${prismLanguage}`}>
                                            {currentFileContent}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-[#858585] text-sm">
                        No file open
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d30] border-t border-[#3e3e42] text-xs text-[#cccccc]">
                    <div className="flex items-center gap-4">
                        <span>Ln 1, Col 1</span>
                        <span>{prismLanguage.toUpperCase()}</span>
                        <span>UTF-8</span>
                        <span className="text-[#858585]">{activeTab}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-[#cccccc] hover:text-white hover:bg-[#3e3e42]"
                        >
                            <ChevronLeft className="h-3 w-3" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-[#cccccc] hover:text-white hover:bg-[#3e3e42]"
                        >
                            <ChevronRight className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}