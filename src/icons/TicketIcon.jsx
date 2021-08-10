import React from "react";
import { createIcon } from "../helpers/icon";

export const TicketIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)">
                <path
                    d="M12.36 4.31a1.354 1.354 0 11-1.916-1.915L9.327 1.278a.451.451 0 00-.639 0L1.985 7.98a.451.451 0 000 .638l1.117 1.117a1.354 1.354 0 111.916 1.916l1.117 1.117a.451.451 0 00.638 0l6.703-6.703a.451.451 0 000-.639L12.36 4.31z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
