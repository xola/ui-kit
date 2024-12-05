import React from "react";
import { createIcon } from "./helpers/icon";

export const CapacityIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <circle cx={3.5} cy={3.5} r={1.444} stroke="currentColor" />
            <path
                d="M11.945 3.5a1.444 1.444 0 11-2.89 0 1.444 1.444 0 012.89 0zM11.945 10.5a1.444 1.444 0 11-2.89 0 1.444 1.444 0 012.89 0zM4.945 10.5a1.444 1.444 0 11-2.89 0 1.444 1.444 0 012.89 0z"
                stroke="currentColor"
            />
        </svg>
    );
});
