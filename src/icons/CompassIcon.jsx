import React from "react";

export const CompassIcon = (props) => (
    <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g clipPath="url(#CompassIcon_svg__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13A6 6 0 107 1a6 6 0 000 12z" />
            <path d="M5.696 5.696L9.55 4.108v0a.26.26 0 01.341.34L8.304 8.305" />
            <path d="M8.304 8.304L5.696 5.696 4.108 9.55v0a.26.26 0 00.34.341l3.856-1.588z" />
        </g>
        <defs>
            <clipPath id="CompassIcon_svg__clip0">
                <path fill="#fff" d="M0 0h14v14H0z" />
            </clipPath>
        </defs>
    </svg>
);
