import React from "react";
import { createIcon } from "../helpers/icon";

export const CloseIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
            <g clipPath="url(#prefix__clip0_5_1805)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11.148 3.147l-8.295 8.295M11.147 11.442L2.853 3.147" />
            </g>
            <defs>
                <clipPath id="prefix__clip0_5_1805">
                    <path fill="#fff" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});

CloseIcon.tags = ["cross", "delete", "x"];
