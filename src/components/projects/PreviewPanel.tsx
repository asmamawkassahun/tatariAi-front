"use client"

import { useEffect, useRef, useState } from "react"
import { RefreshCw, ExternalLink, Globe } from "lucide-react"

interface PreviewPanelProps {
    files: Record<string, string>
}

export function PreviewPanel({ files }: PreviewPanelProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        updatePreview()
    }, [files])

    const updatePreview = () => {
        if (!iframeRef.current) return

        setIsLoading(true)

        // Generate HTML with all components bundled
        const html = generatePreviewHTML(files)

        const iframe = iframeRef.current
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document

        if (iframeDoc) {
            iframeDoc.open()
            iframeDoc.write(html)
            iframeDoc.close()

            // Wait for iframe to load
            setTimeout(() => setIsLoading(false), 500)
        }
    }

    const generatePreviewHTML = (fileContents: Record<string, string>) => {
        // Extract component code
        const components: Record<string, string> = {}
        Object.entries(fileContents).forEach(([path, content]) => {
            if (path.includes("/components/") && path.endsWith(".tsx")) {
                const componentName = path.split("/").pop()?.replace(".tsx", "") || ""
                components[componentName] = content
            }
        })

        // Get the main index file
        const indexContent = fileContents["src/pages/index.tsx"] || ""

        // Transform JSX to HTML (simplified transformation)
        const transformedComponents = Object.entries(components)
            .map(([name, code]) => {
                // Extract the JSX return statement
                const match = code.match(/return\s*$$([\s\S]*?)$$;/m)
                if (match) {
                    return `<!-- ${name} -->\n${match[1]}`
                }
                return ""
            })
            .join("\n")

        return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    }
  </style>
</head>
<body>
  <div id="root">
    ${transformedComponents}
  </div>
</body>
</html>
    `
    }

    const handleRefresh = () => {
        updatePreview()
    }

    const handleOpenExternal = () => {
        const html = generatePreviewHTML(files)
        const blob = new Blob([html], { type: "text/html" })
        const url = URL.createObjectURL(blob)
        window.open(url, "_blank")
    }

    return (
        <div className="h-full bg-[#f5f5f3] flex flex-col">
            {/* Preview Toolbar */}
            <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-2">
                <div className="flex items-center gap-2 flex-1">
                    <div className="px-3 py-1.5 bg-gray-100 rounded-md text-sm text-gray-700 font-medium flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Preview
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleRefresh} className="p-1.5 hover:bg-gray-100 rounded" title="Refresh preview">
                        <RefreshCw className="w-4 h-4 text-gray-600" />
                    </button>
                    <button onClick={handleOpenExternal} className="p-1.5 hover:bg-gray-100 rounded" title="Open in new tab">
                        <ExternalLink className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Preview Frame */}
            <div className="flex-1 bg-white relative">
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                        <div className="w-20 h-20 mb-6">
                            <svg className="w-full h-full text-gray-300" viewBox="0 0 100 100" fill="currentColor">
                                <path d="M50 10 C30 10 20 20 20 35 C20 45 25 50 30 55 C35 60 40 65 40 75 L60 75 C60 65 65 60 70 55 C75 50 80 45 80 35 C80 20 70 10 50 10 Z M45 85 C45 87.5 47.5 90 50 90 C52.5 90 55 87.5 55 85 L45 85 Z" />
                            </svg>
                        </div>
                        <p className="text-gray-600 font-medium mb-8">Spinning up preview</p>
                        <div className="space-y-3 text-sm text-gray-500 max-w-xs">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
                                </div>
                                <span>Loading preview environment...</span>
                            </div>
                        </div>
                    </div>
                )}
                <iframe
                    ref={iframeRef}
                    className="w-full h-full border-0"
                    title="Preview"
                    sandbox="allow-scripts allow-same-origin"
                />
            </div>
        </div>
    )
}
