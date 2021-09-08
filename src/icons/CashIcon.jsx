import React from "react";
import { createIcon } from "../helpers/icon";

export const CashIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.463 4.6h-.005a.194.194 0 01.197.197.203.203 0 01-.405-.005.195.195 0 01.197-.203s0 0 0 0M10.266 7.4h-.005a.194.194 0 01.197.197c0 .107-.09.198-.203.198a.203.203 0 01-.202-.203.195.195 0 01.197-.203" />
                <path d="M11.266 3h-8.8a.8.8 0 00-.8.8v4.8a.8.8 0 00.8.8h8.8a.8.8 0 00.8-.8V3.8a.8.8 0 00-.8-.8z" />
                <path d="M6.866 4.6a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2zM13.666 5.4v4.8c0 .437-.363.8-.8.8h-8.8" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
