import React from "react";
import { createIcon } from "./helpers/icon";

export const CircleDotIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.9 13c3.258 0 5.9-2.686 5.9-6s-2.642-6-5.9-6C3.642 1 1 3.686 1 7s2.642 6 5.9 6z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.375 7c0-.828-.66-1.5-1.475-1.5-.815 0-1.475.672-1.475 1.5s.66 1.5 1.475 1.5c.815 0 1.475-.672 1.475-1.5z"
                fill="currentColor"
            />
        </svg>
    );
});
