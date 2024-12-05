import React from "react";
import { createIcon } from "./helpers/icon";

export const CopyIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M3.014 9.333A1.264 1.264 0 011.75 8.07V3.014c0-.698.566-1.264 1.264-1.264H8.07c.697 0 1.263.566 1.263 1.264"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.986 12.25H5.93a1.264 1.264 0 01-1.263-1.264V5.93c0-.697.566-1.263 1.264-1.263h5.056c.697 0 1.263.566 1.263 1.264v5.056c0 .697-.566 1.263-1.264 1.263v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

CopyIcon.tags = ["duplicate"];
