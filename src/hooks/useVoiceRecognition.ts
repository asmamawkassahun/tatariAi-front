import { useState, useCallback, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';

interface UseVoiceRecognitionProps {
    onResult?: (text: string) => void;
    onError?: (error: string) => void;
    language?: string;
}

export const useVoiceRecognition = ({
    onResult,
    onError,
    language = 'en-US'
}: UseVoiceRecognitionProps = {}) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable
    } = useSpeechRecognition();

    const [error, setError] = useState<string | null>(null);

    // Handle transcript changes
    useEffect(() => {
        if (transcript && onResult) {
            console.log('Transcribed text:', transcript);
            onResult(transcript);
        }
    }, [transcript, onResult]);

    // Handle errors
    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            const errorMessage = 'Speech recognition is not supported in this browser';
            setError(errorMessage);
            if (onError) {
                onError(errorMessage);
            }
        } else if (!isMicrophoneAvailable) {
            const errorMessage = 'Microphone is not available';
            setError(errorMessage);
            if (onError) {
                onError(errorMessage);
            }
        } else {
            setError(null);
        }
    }, [browserSupportsSpeechRecognition, isMicrophoneAvailable, onError]);

    const startListening = useCallback(() => {
        console.log('Starting voice recognition', {
            browserSupportsSpeechRecognition,
            isMicrophoneAvailable,
            listening
        });

        if (browserSupportsSpeechRecognition && isMicrophoneAvailable && !listening) {
            try {
                // The library handles the actual start/stop
                console.log('Voice recognition should start now');
            } catch (err) {
                console.error('Failed to start voice recognition:', err);
                const errorMessage = 'Failed to start voice recognition';
                setError(errorMessage);
                if (onError) {
                    onError(errorMessage);
                }
            }
        } else {
            console.error('Cannot start voice recognition:', {
                browserSupportsSpeechRecognition,
                isMicrophoneAvailable,
                listening
            });
        }
    }, [browserSupportsSpeechRecognition, isMicrophoneAvailable, listening, onError]);

    const stopListening = useCallback(() => {
        console.log('Stopping voice recognition');
        // The library handles the actual stop
    }, []);

    const toggleListening = useCallback(() => {
        if (listening) {
            stopListening();
        } else {
            startListening();
        }
    }, [listening, startListening, stopListening]);

    return {
        isListening: listening,
        isSupported: browserSupportsSpeechRecognition && isMicrophoneAvailable,
        error,
        startListening,
        stopListening,
        toggleListening,
        resetTranscript
    };
};