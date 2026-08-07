import { useEffect, useRef, RefObject } from 'react';

type ScrollToBottomOptions = {
    dependency?: unknown;
    smooth?: boolean;
};

export function useScrollToBottom<T extends HTMLElement>(options: ScrollToBottomOptions = {}): RefObject<T | null> {
    const { dependency, smooth = false } = options;
    const ref = useRef<T>(null);

    useEffect(() => {
        if (ref.current) {
            if (smooth) {
                ref.current.scrollTo({
                    top: ref.current.scrollHeight,
                    behavior: 'smooth'
                });
            } else {
                ref.current.scrollTop = ref.current.scrollHeight;
            }
        }
    }, [dependency, smooth]);

    return ref;
}
