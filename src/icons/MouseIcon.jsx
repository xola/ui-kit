import React from "react";
import { createIcon } from "../helpers/icon";

export const MouseIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7 6.611a.778.778 0 01-.777-.778V4.278a.778.778 0 111.555 0v1.555A.778.778 0 017 6.611z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.89 5.056a3.889 3.889 0 10-7.779 0v3.889a3.889 3.889 0 107.778 0v-3.89z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
