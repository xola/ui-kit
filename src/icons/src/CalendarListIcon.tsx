import React from "react";
import { createIcon } from "./helpers/icon";

export const CalendarListIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 24 25" width={24} height={25} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_12197_16)">
                <path
                    d="M7.5 3.5V6.5"
                    stroke="#222324"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16.5 3.5V6.5"
                    stroke="#222324"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M11.5 12H16.5"
                    stroke="#222324"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M11.5 15.5H16.5"
                    stroke="#222324"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M7.5 12H8.5" stroke="#222324" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path
                    d="M7.5 15.5H8.5"
                    stroke="#222324"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M18 5H6C4.34315 5 3 6.34315 3 8V18.5C3 20.1569 4.34315 21.5 6 21.5H18C19.6569 21.5 21 20.1569 21 18.5V8C21 6.34315 19.6569 5 18 5Z"
                    stroke="#222324"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_12197_16">
                    <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                </clipPath>
            </defs>
        </svg>
    );
});

CalendarListIcon.tags = ["date"];
