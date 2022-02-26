import React from "react";
import { createIcon } from "../helpers/icon";

export const StarIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.324 2.199l1.488 2.946 2.861.283a.364.364 0 01.306.236.356.356 0 01-.085.375L9.536 8.373l.874 3.172a.356.356 0 01-.12.372.364.364 0 01-.392.044L7 10.525l-2.898 1.437a.364.364 0 01-.507-.212.355.355 0 01-.004-.203l.873-3.174-2.358-2.336a.357.357 0 01.22-.61l2.862-.284 1.488-2.945A.36.36 0 017 2a.365.365 0 01.324.2z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

StarIcon.tags = ["favourite", "favorite"];
