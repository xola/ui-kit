import React from "react";
import { createIcon } from "../helpers/icon";

export const SearchIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
            <path
                d="M6.217 10.878a4.661 4.661 0 100-9.322 4.661 4.661 0 000 9.322zM9.514 9.513l2.93 2.931"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
