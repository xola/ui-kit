import React from "react";

export const DotCircleIcon = (props) => (
    <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g clipPath="url(#DotCircleIcon_svg__clip0)">
            <path
                d="M7 13A6 6 0 107 1a6 6 0 000 12z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M8.5 7a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" fill="currentColor" />
        </g>
        <defs>
            <clipPath id="DotCircleIcon_svg__clip0">
                <path fill="#fff" d="M0 0h14v14H0z" />
            </clipPath>
        </defs>
    </svg>
);
