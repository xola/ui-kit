import React from "react";
import { createIcon } from "../helpers/icon";

export const AnnounceIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.666 9.904l1.18 1.776M9.187 2l4.479 6.746M13.43 8.39l-9.82 2.934-.709-1.067 6.514-7.912 4.009 6.038.007.006z" />
                <path d="M8.721 9.798c.54.617.47 1.558-.147 2.098-.625.541-1.566.47-2.106-.147-.042-.05-.084-.098-.12-.154l-.617-.934" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
