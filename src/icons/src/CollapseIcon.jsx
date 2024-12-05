import React from "react";
import { createIcon } from "./helpers/icon";

export const CollapseIcon = createIcon((props) => {
    return (
        // Checked with Barth this is an excepion to the design system and should stay at 10px
        <svg width="10" height="8" fill="none" viewBox="0 0 10 8" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1.291 1.236l2.94 2.94v0a.272.272 0 010 .385L1.29 7.5M6.041 1.236l2.94 2.94v0a.272.272 0 010 .385L6.04 7.5"
            />
        </svg>
    );
});
