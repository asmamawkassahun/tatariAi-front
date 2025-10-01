import { Button } from '../ui/button';
import { FileImage, FileText, FileVideo, FileAudio, X } from 'lucide-react';
import { FileAttachment as FileAttachmentType } from '@/hooks/useFileAttachments';

interface FileAttachmentProps {
    attachment: FileAttachmentType;
    onRemove: (id: string) => void;
}

const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage className="w-4 h-4" />;
    if (type.startsWith('video/')) return <FileVideo className="w-4 h-4" />;
    if (type.startsWith('audio/')) return <FileAudio className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
};


export const FileAttachment = ({ attachment, onRemove }: FileAttachmentProps) => {
    return (
        <div className="relative group flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
            {getFileIcon(attachment.type)}
            <span className="text-sm text-gray-700 dark:text-gray-300 max-w-32 truncate">
                {attachment.name}
            </span>
            <Button
                variant="ghost"
                size="sm"
                className="absolute cursor-pointer -top-1 -right-1 h-5 w-5 p-0 bg-black/60 hover:bg-black/80 dark:bg-white/80 dark:hover:bg-white/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
                onClick={() => onRemove(attachment.id)}
            >
                <X className="w-3 h-3" />
            </Button>
        </div>
    );
};
