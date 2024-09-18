import { useEffect, useState } from "react";

export const useViewportHeight = () => {
    const [viewportHeight, setViewportHeight] = useState(0);

    useEffect(() => {
        const detectViewportHeight = () => {
            // Use window.innerHeight for a more accurate viewport height
            // eslint-disable-next-line no-undef
            setViewportHeight(window.innerHeight);
        };

        // Detect height on mount
        detectViewportHeight();

        // Optional: Re-detect on orientation change for mobile devices
        // eslint-disable-next-line no-undef
        window.addEventListener("orientationchange", detectViewportHeight);

        return () => {
            // eslint-disable-next-line no-undef
            window.removeEventListener("orientationchange", detectViewportHeight);
        };
    }, []);

    return viewportHeight;
};
