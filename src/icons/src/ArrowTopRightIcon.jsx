import React from "react";
import { createIcon } from "./helpers/icon";

export const ArrowTopRightIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <g
                clipPath="url(#prefix__clip0_1467_0)"
                stroke="currentColor"
                strokeWidth={0.912}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M5.182 2.757h6.06v6.061M11.244 2.76L2.76 11.244" />
            </g>
            <defs>
                <clipPath id="prefix__clip0_1467_0">
                    <path fill="#fff" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
