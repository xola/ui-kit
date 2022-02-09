import React from "react";
import { createIcon } from "../helpers/icon";

export const SearchAltIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7 4.083H2.917A1.17 1.17 0 001.75 5.25v5.833a1.17 1.17 0 001.167 1.167H8.75a1.17 1.17 0 001.167-1.167V7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.625 7A2.614 2.614 0 017 4.375 2.614 2.614 0 019.625 1.75a2.614 2.614 0 012.625 2.625A2.614 2.614 0 019.625 7zM12.834 7.583l-1.342-1.341"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
