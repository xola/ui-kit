import React from "react";
import { createIcon } from "../helpers/icon";

export const ShareIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.5 8.044v-6.04M5.409 4.09L7.499 2l2.09 2.09M11.216 7.043v4.324c0 .255-.21.464-.465.464H4.248a.463.463 0 01-.465-.464V7.043"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
