"use client"

import { useEffect, useRef, useState } from "react"
import { RefreshCw, ExternalLink } from "lucide-react"

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
        <div className="h-full bg-[#1e1e1e] flex flex-col">
            {/* Preview Toolbar */}
            <div className="h-12 bg-[#252526] border-b border-[#2d2d30] flex items-center px-4 gap-2">
                <div className="flex items-center gap-2 flex-1">
                    <div className="text-sm text-gray-400">Preview</div>
                    {isLoading && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Loading...</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleRefresh} className="p-1.5 hover:bg-[#2d2d30] rounded" title="Refresh preview">
                        <RefreshCw className="w-4 h-4 text-gray-400" />
                    </button>
                    <button onClick={handleOpenExternal} className="p-1.5 hover:bg-[#2d2d30] rounded" title="Open in new tab">
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Preview Frame */}
            <div className="flex-1 bg-white relative">
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
