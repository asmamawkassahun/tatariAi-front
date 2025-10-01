import { useState, useEffect } from 'react';

interface UseTypingPlaceholderProps {
    texts: string[];
    speed?: number;
    deleteSpeed?: number;
    pauseTime?: number;
}

export const useTypingPlaceholder = ({
    texts,
    speed = 100,
    deleteSpeed = 50,
    pauseTime = 2000
}: UseTypingPlaceholderProps) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const prefix = "Ask Lovable to create ";

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isPaused) {
                setIsPaused(false);
                setIsDeleting(true);
                return;
            }

            const fullText = prefix + texts[currentTextIndex];

            if (isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length - 1));
                if (currentText === prefix) {
                    setIsDeleting(false);
                    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
                }
            } else {
                setCurrentText(fullText.substring(0, currentText.length + 1));
                if (currentText === fullText) {
                    setIsPaused(true);
                }
            }
        }, isPaused ? pauseTime : isDeleting ? deleteSpeed : speed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, isPaused, currentTextIndex, texts, speed, deleteSpeed, pauseTime, prefix]);

    return currentText;
};
