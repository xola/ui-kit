import React from "react";
import { createIcon } from "../helpers/icon";

export const ServiceIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.674 4v5.863M13.666 9.13a2.2 2.2 0 00-2.199-2.199H8.72a2.2 2.2 0 00-2.198-2.198H2.666V9.13h11zM6.521 6.931h2.748" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
