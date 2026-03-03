import { useEffect, useState } from "react";

export const useViewportHeight = (): number => {
    const [viewportHeight, setViewportHeight] = useState(0);

    useEffect(() => {
        const detectViewportHeight = () => {
            setViewportHeight(window.innerHeight);
        };

        detectViewportHeight();

        window.addEventListener("orientationchange", detectViewportHeight);

        return () => {
            window.removeEventListener("orientationchange", detectViewportHeight);
        };
    }, []);

    return viewportHeight;
};
