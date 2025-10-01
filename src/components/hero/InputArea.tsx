import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { useTypingPlaceholder } from '@/hooks/useTypingPlaceholder';

interface InputAreaProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export const InputArea = ({
    value,
    onChange,
    disabled = false
}: InputAreaProps) => {
    const typingTexts = [
        "an internal tool that...",
        "a dashboard for managing user data",
        "a real-time chat application",
        "a mobile app for e-commerce",
        "an AI-powered analytics tool",
        "a project management system",
        "a social media platform",
        "a data visualization dashboard"
    ];

    const typingPlaceholder = useTypingPlaceholder({
        texts: typingTexts,
        speed: 80,
        deleteSpeed: 40,
        pauseTime: 3000
    });

    return (
        <div className="flex items-center gap-2 p-2">
            <Input
                placeholder={typingPlaceholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className={cn(
                    "flex-1 border-0 bg-transparent text-gray-700 dark:text-gray-300",
                    "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                    "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
                    "focus-visible:border-0 focus-visible:shadow-none",
                    "text-sm md:text-base resize-none",
                    "shadow-none outline-none ring-0",
                    "rounded-none px-0 py-0 h-auto min-h-0",
                    "transition-none"
                )}
            />
        </div>
    );
};
