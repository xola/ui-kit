import React from "react";
import { createIcon } from "../helpers/icon";

export const ViewNotesIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.295 4.868h4.59M4.295 7.163h2.868M11.179 6.5V3.147c0-.634-.514-1.147-1.148-1.147H3.147C2.513 2 2 2.513 2 3.147v7.458c0 .634.513 1.147 1.147 1.147H5M10.009 9.785a.914.914 0 100 1.828.914.914 0 000-1.828v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.348 11.107a.635.635 0 00.101-.664.5.5 0 00-.096-.16 6.554 6.554 0 00-1.146-1.017c-.565-.389-1.331-.766-2.2-.766-.869 0-1.636.376-2.2.764a6.458 6.458 0 00-1.137 1.004.625.625 0 00-.01.846l.373-.333-.375.33c.166.19.576.625 1.146 1.017.564.388 1.33.764 2.198.764.869 0 1.635-.376 2.2-.765.569-.392.979-.828 1.146-1.02z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
