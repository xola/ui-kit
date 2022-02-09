import React from "react";
import { createIcon } from "../helpers/icon";

export const CirclePlusIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7 12.9A5.9 5.9 0 107 1.1a5.9 5.9 0 000 11.8zM7 10.337V3.662M10.338 7H3.663"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
