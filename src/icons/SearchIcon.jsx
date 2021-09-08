import React from "react";
import { createIcon } from "../helpers/icon";

export const SearchIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.883 10.878a4.661 4.661 0 100-9.323 4.661 4.661 0 000 9.323zM10.181 9.514l2.93 2.93"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
