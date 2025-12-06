import React from "react";
import { createIcon } from "./helpers/icon";

export const TableIcon = createIcon((props) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_14653_14821)">
                <path d="M3 9H21" stroke="#222324" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path
                    d="M19 4H5C3.895 4 3 4.895 3 6V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V6C21 4.895 20.105 4 19 4Z"
                    stroke="#222324"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M9 9V21" stroke="#222324" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 9V21" stroke="#222324" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 15H21" stroke="#222324" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_14653_14821">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
});

TableIcon.tags = ["table", "dashboard"];
