import { useState, useCallback } from 'react';

export interface FileAttachment {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
}

export const useFileAttachments = () => {
    const [attachments, setAttachments] = useState<FileAttachment[]>([]);

    const addAttachment = useCallback((file: File) => {
        const newAttachment: FileAttachment = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file)
        };
        setAttachments(prev => [...prev, newAttachment]);
    }, []);

    const removeAttachment = useCallback((id: string) => {
        setAttachments(prev => prev.filter(att => att.id !== id));
    }, []);

    const clearAttachments = useCallback(() => {
        setAttachments([]);
    }, []);

    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        files.forEach(addAttachment);
    }, [addAttachment]);

    return {
        attachments,
        addAttachment,
        removeAttachment,
        clearAttachments,
        handleFileUpload
    };
};
