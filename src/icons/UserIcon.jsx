import React from "react";
import { createIcon } from "../helpers/icon";

export const UserIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
            <path
                d="M2.3 12.3a2.87 2.87 0 012.887-2.887h3.347a2.87 2.87 0 012.888 2.887M8.862 2.588c1.116 1.115 1.116 2.887 0 3.937-1.116 1.05-2.887 1.116-3.937 0-1.05-1.116-1.116-2.887 0-3.937a2.855 2.855 0 013.937 0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
