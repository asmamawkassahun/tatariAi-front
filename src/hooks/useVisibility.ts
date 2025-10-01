import { useState, useCallback } from 'react';

export type VisibilityType = 'public' | 'workspace' | 'personal';

export const useVisibility = (initialVisibility: VisibilityType = 'public') => {
    const [visibility, setVisibility] = useState<VisibilityType>(initialVisibility);

    const toggleVisibility = useCallback(() => {
        const options: VisibilityType[] = ['public', 'workspace', 'personal'];
        const currentIndex = options.indexOf(visibility);
        const nextIndex = (currentIndex + 1) % options.length;
        setVisibility(options[nextIndex]);
    }, [visibility]);

    const setVisibilityType = useCallback((newVisibility: VisibilityType) => {
        setVisibility(newVisibility);
    }, []);

    return {
        visibility,
        toggleVisibility,
        setVisibilityType
    };
};
