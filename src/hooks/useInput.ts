import { useState, useCallback } from 'react';

export const useInput = (initialValue: string = '') => {
    const [input, setInput] = useState(initialValue);

    const handleInputChange = useCallback((value: string) => {
        setInput(value);
    }, []);

    const clearInput = useCallback(() => {
        setInput('');
    }, []);

    const canSend = input.trim().length > 0;

    return {
        input,
        setInput,
        handleInputChange,
        clearInput,
        canSend
    };
};
