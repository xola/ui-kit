import React from "react";
import { createIcon } from "../helpers/icon";

export const CalendarIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
            <path
                d="M10.333 12.5H3.667C2.747 12.5 2 11.754 2 10.833V4.167c0-.92.746-1.667 1.667-1.667h6.666c.92 0 1.667.746 1.667 1.667v6.666c0 .92-.746 1.667-1.667 1.667zM4.5 1.5v2.174M9.5 1.5v2.174"
                stroke="#222324"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
