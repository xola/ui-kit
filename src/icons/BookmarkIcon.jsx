import React from "react";
import { createIcon } from "../helpers/icon";

export const BookmarkIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M9.184 5.498a.22.22 0 01-.217.217.204.204 0 01-.112-.035L7.77 5.03l-1.31.68v-.004a.222.222 0 01-.321-.2V2h3.037l.008 3.498z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.221 2.022h-9.11a.434.434 0 00-.434.434v9.11c0 .24.194.434.434.434h9.11c.24 0 .434-.194.434-.434v-9.11a.434.434 0 00-.434-.434z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
