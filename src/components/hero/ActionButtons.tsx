import React from 'react';
import { Button } from '../ui/button';
import { Plus, Paperclip, Globe, Zap, Mic, MicOff, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSpeechRecognition } from 'react-speech-recognition';

interface ActionButtonsProps {
    onFileUpload: () => void;
    onVisibilityChange: () => void;
    onSend: () => void;
    onVoice?: () => void;
    onSupabase?: () => void;
    onVoiceResult?: (text: string) => void;
    visibility: 'public' | 'workspace' | 'personal';
    canSend: boolean;
    disabled?: boolean;
}

export const ActionButtons = ({
    onFileUpload,
    onVisibilityChange,
    onSend,
    onVoice,
    onSupabase,
    onVoiceResult,
    visibility,
    canSend,
    disabled = false
}: ActionButtonsProps) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable
    } = useSpeechRecognition();

    // Handle transcript changes
    React.useEffect(() => {
        if (transcript && onVoiceResult) {
            console.log('Transcribed text:', transcript);
            onVoiceResult(transcript);
            resetTranscript(); // Clear the transcript after using it
        }
    }, [transcript, onVoiceResult, resetTranscript]);

    const isSupported = browserSupportsSpeechRecognition && isMicrophoneAvailable;
    const isListening = listening;
    return (
        <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-1">
                {/* Add button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 cursor-pointer rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={onFileUpload}
                    disabled={disabled}
                >
                    <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </Button>

                {/* Attach button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-3 cursor-pointer rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={onFileUpload}
                    disabled={disabled}
                >
                    <Paperclip className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
                        Attach
                    </span>
                </Button>

                {/* Visibility button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-3 cursor-pointer rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={onVisibilityChange}
                    disabled={disabled}
                >
                    <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400 hidden sm:inline capitalize">
                        {visibility}
                    </span>
                </Button>

                {/* Supabase button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-3 cursor-pointer rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={onSupabase}
                    disabled={disabled}
                >
                    <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
                        Supabase
                    </span>
                </Button>
            </div>

            <div className="flex items-center gap-2">
                {/* Voice button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-9 w-9 cursor-pointer rounded-full border border-gray-300 dark:border-gray-600",
                        isListening
                            ? "bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                    onClick={() => {
                        console.log('Voice button clicked', { isSupported, isListening });

                        if (isSupported) {
                            if (listening) {
                                // Stop listening - the library handles this automatically
                                console.log('Stopping voice recognition');
                            } else {
                                // Start listening - the library handles this automatically
                                console.log('Starting voice recognition');
                            }
                        } else {
                            console.log('Voice recognition not supported, trying fallback');
                            if (onVoice) {
                                onVoice();
                            }
                        }
                    }}
                    disabled={disabled}
                    title={isSupported ? (isListening ? "Stop listening" : "Start voice input") : "Voice input not supported - click to try anyway"}
                >
                    {isListening ? (
                        <MicOff className="w-4 h-4 text-red-600 dark:text-red-400" />
                    ) : (
                        <Mic className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    )}
                </Button>

                {/* Send button */}
                <Button
                    size="sm"
                    className={cn(
                        "h-9 w-9 cursor-pointer rounded-full",
                        "bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600",
                        "text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    onClick={onSend}
                    disabled={!canSend || disabled}
                >
                    <ArrowUp className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};
