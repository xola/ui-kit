import React from "react";
import { createIcon } from "../helpers/icon";

export const ExportIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.613 12.108h-.007c2.813 1.135 6.017-.231 7.16-3.05a5.5 5.5 0 00-3.042-7.157A5.514 5.514 0 002.55 9.067" />
                <path d="M9.198 8.186L9.2 5.48l-2.706.002M9.2 5.48l-5.416 5.416" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
