import React from "react";
import { createIcon } from "../helpers/icon";

export const CircleCrossImage = createIcon((props) => {
    const className = `${props.className ?? ""} w-[96px] h-[24px]`;
    const newProps = { ...props, className };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="24" fill="none" viewBox="0 0 96 24" {...newProps}>
            <path stroke="#BDC0C6" strokeDasharray="4 4" d="M0.5 12.5L95.5 12.5" />
            <circle cx="48" cy="12" r="11.5" fill="#fff" stroke="currentColor" />
            <path
                stroke="#FF5A5A"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M44.863 8.965l7.071 7.07M51.934 8.964l-7.07 7.071"
            />
        </svg>
    );
});
