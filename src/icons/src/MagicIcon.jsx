import React from "react";
import { createIcon } from "./helpers/icon";

export const MagicIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
            <path
                d="M11.445 3.111V2M10.89 2.555H12"
                stroke="currentColor"
                strokeWidth={0.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                clipRule="evenodd"
                d="M3.04 11.836l-.876-.875a.56.56 0 010-.792l5.32-5.319a.56.56 0 01.791 0l.875.875a.56.56 0 010 .792l-5.32 5.32a.56.56 0 01-.79 0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M7.839 7.728L6.267 6.156" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M12 8.667h-1.11M11.445 8.111v1.111M5.334 2v1.111M5.89 2.555H4.777"
                stroke="currentColor"
                strokeWidth={0.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

MagicIcon.tags = ["view", "custom"];
