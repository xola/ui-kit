import React from "react";
import { createIcon } from "../helpers/icon";

export const SearchAltIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.666 4.083H3.583A1.17 1.17 0 002.416 5.25v5.833a1.17 1.17 0 001.167 1.167h5.833a1.17 1.17 0 001.167-1.167V7" />
                <path d="M10.291 7a2.614 2.614 0 01-2.625-2.625 2.614 2.614 0 012.625-2.625 2.614 2.614 0 012.625 2.625A2.614 2.614 0 0110.291 7z" />
                <path d="M9.416 4.142h.058c.642 0 1.109.525 1.109 1.108M13.5 7.583l-1.342-1.341" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
