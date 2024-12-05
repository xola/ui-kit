import React from "react";
import { createIcon } from "./helpers/icon";

export const ViewNotesIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M3.9 4.499h4.797M3.9 6.898h2.998M11.096 6.205V2.7a1.2 1.2 0 00-1.2-1.2H2.7a1.2 1.2 0 00-1.2 1.2v7.796a1.2 1.2 0 001.2 1.2h1.936"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M9.871 9.64a.955.955 0 100 1.91.955.955 0 000-1.91z" fill="currentColor" />
            <path
                d="M13.346 11.006a.641.641 0 00.102-.671.497.497 0 00-.096-.161 6.822 6.822 0 00-1.195-1.059c-.588-.405-1.385-.797-2.286-.797-.903 0-1.7.39-2.288.795a6.734 6.734 0 00-1.185 1.046.63.63 0 00-.01.855l.373-.334-.375.33c.173.198.6.652 1.194 1.06.588.404 1.384.795 2.285.795.902 0 1.698-.391 2.286-.796a6.681 6.681 0 001.195-1.063z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
