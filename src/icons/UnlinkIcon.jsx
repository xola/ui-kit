import React from "react";
import { createIcon } from "../helpers/icon";

export const UnlinkIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M5.722 3.5L4.166 1.943M4.944 5.055h-.778M7.277 2.722v-.778M8.833 4.277h2.333a2.333 2.333 0 110 4.667H8.833M3.891 6.697L2.516 8.072a2.333 2.333 0 003.3 3.3L7.19 9.996"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
