import React from "react";
import { createIcon } from "../helpers/icon";

export const PinIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.089 7.656a1.967 1.967 0 110-3.933 1.967 1.967 0 010 3.933z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.089 12.9S2.5 9.13 2.5 5.69a4.589 4.589 0 119.178 0c0 3.442-4.59 7.211-4.59 7.211z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

PinIcon.tags = ["location", "city", "state", "country"];
