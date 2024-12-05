import React from "react";
import { createIcon } from "./helpers/icon";

export const ShareIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M6.833 8.044v-6.04M4.743 4.09L6.833 2l2.091 2.09M10.55 7.043v4.324a.466.466 0 01-.465.464H3.582a.463.463 0 01-.465-.464V7.043"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
