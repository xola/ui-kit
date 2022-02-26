import React from "react";
import { createIcon } from "../helpers/icon";

export const UserAddIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.6 12c0-1.563 1.25-2.75 2.75-2.75h3.188c1.563 0 2.75 1.25 2.75 2.75M8.85 2.75c1.063 1.063 1.063 2.75 0 3.75-1.062 1-2.75 1.063-3.75 0s-1.062-2.75 0-3.75c1.063-1 2.688-1 3.75 0zM1 7h2.5M2.249 8.25v-2.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

UserAddIcon.tags = ["plus"];
