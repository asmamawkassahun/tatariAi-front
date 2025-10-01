import { FileAttachment } from './FileAttachment';
import { FileAttachment as FileAttachmentType } from '@/hooks/useFileAttachments';

interface FileAttachmentsListProps {
    attachments: FileAttachmentType[];
    onRemoveAttachment: (id: string) => void;
}

export const FileAttachmentsList = ({ attachments, onRemoveAttachment }: FileAttachmentsListProps) => {
    if (attachments.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 p-2 pb-0 ">
            {attachments.map((attachment) => (
                <FileAttachment
                    key={attachment.id}
                    attachment={attachment}
                    onRemove={onRemoveAttachment}
                />
            ))}
        </div>
    );
};
