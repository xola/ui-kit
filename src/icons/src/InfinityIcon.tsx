import React from "react";
import { createIcon } from "./helpers/icon";

export const InfinityIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.667 7.068S5.201 9.33 3.93 9.33a2.263 2.263 0 010-4.526c1.272 0 3.738 2.263 3.738 2.263zM7.667 7.068s2.467 2.263 3.736 2.263a2.263 2.263 0 000-4.526c-1.27 0-3.736 2.263-3.736 2.263z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
