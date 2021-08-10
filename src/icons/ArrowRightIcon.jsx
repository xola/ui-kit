import React from "react";
import { createIcon } from "../helpers/icon";

export const ArrowRightIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g
                clipPath="url(#prefix__clip0)"
                stroke="currentColor"
                strokeWidth={0.912}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M9.38 2.714L13.666 7 9.38 11.286M13.666 7.003h-12" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
