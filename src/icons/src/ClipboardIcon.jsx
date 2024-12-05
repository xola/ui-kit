import React from "react";
import { createIcon } from "./helpers/icon";

export const ClipboardIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M8.874 1.957h1.957c.264 0 .478.214.478.478v9.087a.478.478 0 01-.478.478H3.178a.478.478 0 01-.478-.478V2.435c0-.264.214-.478.478-.478h1.957"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.961 1.957a.957.957 0 10-1.913 0h-.956V3.39h3.826V1.957H7.96z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

ClipboardIcon.tags = ["resources"];
