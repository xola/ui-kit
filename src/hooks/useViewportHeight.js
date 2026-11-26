import { useEventListener, useMount } from "ahooks";
import { useState } from "react";

export const useViewportHeight = () => {
    const [viewportHeight, setViewportHeight] = useState(0);

    const detectViewportHeight = () => setViewportHeight(window.innerHeight);

    useMount(detectViewportHeight);
    useEventListener("orientationchange", detectViewportHeight);

    return viewportHeight;
};
