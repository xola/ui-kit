import React from "react";
import { createIcon } from "../helpers/icon";

export const ArrowTopRightIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g
                clipPath="url(#prefix__clip0)"
                stroke="currentColor"
                strokeWidth={0.912}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M5.848 2.757h6.06v6.061M11.91 2.76l-8.485 8.484" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
