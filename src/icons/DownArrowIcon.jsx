import React from "react";
import { createIcon } from "../helpers/icon";

export const DownArrowIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14" {...props}>
            <path
                d="M10 6L7.184 8.816v0a.26.26 0 01-.368 0L4 6"
                stroke="#222324"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
