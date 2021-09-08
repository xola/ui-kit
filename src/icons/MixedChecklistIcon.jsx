import React from "react";
import { createIcon } from "../helpers/icon";

export const MixedChecklistIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.666 4.638l.983.983L6.269 3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <rect
                x={2.666}
                y={8}
                width={4}
                height={4}
                rx={1.333}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M8.333 4h4M8.333 10h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});
