export interface FileItem {
    name: string
    path: string
    content: string
    language: string
    type: "file" | "folder"
    children?: FileItem[]
}