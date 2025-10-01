import { useRef } from 'react';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { FileAttachmentsList } from './FileAttachmentsList';
import { InputArea } from './InputArea';
import { ActionButtons } from './ActionButtons';
import { useFileAttachments } from '@/hooks/useFileAttachments';
import { useInput } from '@/hooks/useInput';
import { useVisibility } from '@/hooks/useVisibility';

interface HeroCardProps {
    onSend?: (input: string, attachments: any[], visibility: string) => void;
    onVoice?: () => void;
    onSupabase?: () => void;
    disabled?: boolean;
    placeholder?: string;
}

export const HeroCard = ({
    onSend,
    onVoice,
    onSupabase,
    disabled = false,
    placeholder = "Ask Lovable to create an internal tool that..."
}: HeroCardProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { attachments, removeAttachment, handleFileUpload } = useFileAttachments();
    const { input, handleInputChange, canSend, setInput } = useInput();
    const { visibility, toggleVisibility } = useVisibility();

    const handleFileUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleSend = () => {
        if (canSend && onSend) {
            onSend(input, attachments, visibility);
        }
    };

    const handleVoiceResult = (text: string) => {
        setInput(text);
    };

    return (
        <Card className={cn(
            "relative overflow-hidden transition-all duration-200",
            "bg-[#F5F5F3] dark:bg-[#1A1A1A]",
            "border border-gray-200 dark:border-gray-700",
            "shadow-[0px_8px_10px_-6px_#0000001A] dark:shadow-[0px_8px_10px_-6px_#00000040]",
            "rounded-[1.75rem] p-2"
        )}>
            <div className='gap-2'>  {/* File attachments preview */}
                <FileAttachmentsList
                    attachments={attachments}
                    onRemoveAttachment={removeAttachment}
                />

                {/* Main input area */}
                <InputArea
                    value={input}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    disabled={disabled}
                /></div>

            {/* Action buttons */}
            <ActionButtons
                onFileUpload={handleFileUploadClick}
                onVisibilityChange={toggleVisibility}
                onSend={handleSend}
                onVoice={onVoice}
                onSupabase={onSupabase}
                onVoiceResult={handleVoiceResult}
                visibility={visibility}
                canSend={canSend}
                disabled={disabled}
            />

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
            />
        </Card>
    );
};
