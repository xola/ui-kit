import React from "react";
import { createIcon } from "../helpers/icon";

export const CirclePlusIcon = createIcon((props) => {
    // This icon should be width 96px and height = 24px
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="24" fill="none" viewBox="0 0 96 24" {...props}>
            <path stroke="#BDC0C6" strokeDasharray="4 4" d="M0.5 12.5L95.5 12.5" />
            <circle cx="48" cy="12" r="11.5" fill="#fff" stroke="currentColor" />
            <path stroke="#1352C6" strokeLinecap="round" strokeLinejoin="round" d="M48.5 7.5v10M53.5 12.5h-10" />
        </svg>
    );
});
