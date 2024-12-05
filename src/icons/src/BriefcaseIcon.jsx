import React from "react";
import { createIcon } from "./helpers/icon";

export const BriefcaseIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M11.01 3.719H2.99c-.806 0-1.459.653-1.459 1.458v5.833c0 .806.653 1.459 1.459 1.459h8.02c.806 0 1.459-.653 1.459-1.459V5.177c0-.805-.653-1.458-1.459-1.458z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.824 3.354a1.823 1.823 0 00-3.646 0v.365h3.646v-.365zM4.57 4.083v8.264M9.43 4.083v8.264"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

BriefcaseIcon.tags = ["back office", "work", "business"];
