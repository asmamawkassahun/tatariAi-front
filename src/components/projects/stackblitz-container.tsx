"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import sdk from "@stackblitz/sdk"
import type { Project } from "@stackblitz/sdk"
import { Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StackBlitzContainerProps {
    files: Record<string, string>
    activeFile: string
    onFileChange?: (path: string, content: string) => void
}

export function StackBlitzContainer({ files, activeFile, onFileChange }: StackBlitzContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vmRef = useRef<any>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [retryCount, setRetryCount] = useState(0)
    const [isRetrying, setIsRetrying] = useState(false)

    const initStackBlitz = useCallback(async () => {
        if (!containerRef.current) return

        try {
            setIsLoading(true)
            setError(null)

            // Clear any existing content
            if (containerRef.current) {
                containerRef.current.innerHTML = ''
            }

            const project: Project = {
                title: "Lovable IDE Project",
                description: "Live coding environment",
                template: "create-react-app",
                files: {
                    ...files,
                    "public/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
                    "package.json": `{
  "name": "lovable-project",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`,
                },
            }

            // Set a timeout for the embed operation
            const embedPromise = sdk.embedProject(containerRef.current, project, {
                openFile: activeFile,
                view: "editor",
                theme: "dark",
                height: "100%",
                width: "100%",
                hideNavigation: true,
                hideDevTools: true,
                forceEmbedLayout: true,
                showSidebar: false,
                clickToLoad: false,
                terminalHeight: 0,
            })

            // Add timeout wrapper
            const timeoutPromise = new Promise((_, reject) => {
                timeoutRef.current = setTimeout(() => {
                    reject(new Error("StackBlitz initialization timeout"))
                }, 15000) // 15 second timeout
            })

            const vm = await Promise.race([embedPromise, timeoutPromise])

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }

            vmRef.current = vm
            setIsLoading(false)
            setRetryCount(0) // Reset retry count on success

        } catch (err) {
            console.error("[v0] StackBlitz initialization error:", err)

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }

            if (retryCount < 3) {
                setIsRetrying(true)
                setRetryCount(prev => prev + 1)

                // Exponential backoff
                const delay = Math.pow(2, retryCount) * 1000
                setTimeout(() => {
                    setIsRetrying(false)
                    initStackBlitz()
                }, delay)
            } else {
                setError("Unable to load the development environment. This might be due to network issues or StackBlitz service being temporarily unavailable.")
                setIsLoading(false)
                setIsRetrying(false)
            }
        }
    }, [files, activeFile, retryCount])

    useEffect(() => {
        // Cleanup function
        const cleanup = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
            if (vmRef.current) {
                vmRef.current = null
            }
        }

        // Initialize with delay
        const timer = setTimeout(() => {
            initStackBlitz()
        }, 1000)

        return () => {
            clearTimeout(timer)
            cleanup()
        }
    }, [initStackBlitz])

    useEffect(() => {
        if (vmRef.current && activeFile) {
            vmRef.current.editor.openFile(activeFile)
        }
    }, [activeFile])

    useEffect(() => {
        if (vmRef.current) {
            Object.entries(files).forEach(([path, content]) => {
                vmRef.current.applyFsDiff({
                    create: { [path]: content },
                    destroy: [],
                })
            })
        }
    }, [files])

    const handleRetry = () => {
        setError(null)
        setRetryCount(0)
        setIsRetrying(false)
        initStackBlitz()
    }

    if (error) {
        return (
            <div className="h-full bg-[#1e1e1e] flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                        <RefreshCw className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Environment Error</h3>
                    <p className="text-gray-400 text-sm mb-4">{error}</p>
                    <Button
                        onClick={handleRetry}
                        variant="outline"
                        className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full relative bg-[#1e1e1e] overflow-hidden">
            {(isLoading || isRetrying) && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e] z-10">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-[#007acc]" />
                        <p className="text-gray-400 text-sm">
                            {isRetrying ? `Retrying... (${retryCount}/3)` : "Initializing development environment..."}
                        </p>
                    </div>
                </div>
            )}
            <div ref={containerRef} className="h-full w-full stackblitz-container" style={{ height: 'calc(100% + 50px)', marginBottom: '-50px' }} />
            {/* Overlay to hide bottom controls */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-[#1e1e1e] pointer-events-none z-[5]" /> */}
        </div>
    )
}
