import React from "react";
import { createIcon } from "../helpers/icon";

export const BookmarkIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.518 5.498a.22.22 0 01-.217.217.204.204 0 01-.113-.035l-1.084-.65-1.31.68v-.004a.222.222 0 01-.321-.2V2H8.51l.008 3.498z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.565 2.022h-9.13A.435.435 0 002 2.457v9.13c0 .24.195.435.435.435h9.13c.24 0 .435-.195.435-.435v-9.13a.435.435 0 00-.435-.435z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
