import React from "react";
import { createIcon } from "../helpers/icon";

export const VeteranIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M3.166 7.642a.6.6 0 01.933-.499L7.333 9.3A.6.6 0 008 9.3l3.234-2.157a.6.6 0 01.933.5V9.93a.6.6 0 01-.267.5l-3.9 2.599a.6.6 0 01-.666 0l-3.9-2.602a.6.6 0 01-.267-.5V7.642zM7.949 1.172L8.566 2.5h1.2a.293.293 0 01.207.513L8.93 4.04l.577 1.324a.314.314 0 01-.448.393l-1.394-.784-1.394.784a.314.314 0 01-.448-.393l.577-1.324L5.36 3.014a.293.293 0 01.206-.514h1.2l.617-1.328a.318.318 0 01.566 0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
