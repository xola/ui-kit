import React from "react";
import { createIcon } from "../helpers/icon";

export const SquareIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)">
                <path
                    d="M11 12H4.332c-.921 0-1.667-.746-1.667-1.667V3.667C2.666 2.746 3.412 2 4.333 2h6.666c.92 0 1.667.746 1.667 1.667v6.666c0 .92-.746 1.667-1.667 1.667z"
                    stroke="currentColor"
                />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
