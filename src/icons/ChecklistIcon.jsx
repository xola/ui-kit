import React from "react";
import { createIcon } from "../helpers/icon";

export const ChecklistIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
            <path
                d="M2 4.638l.983.983L5.603 3M2 10.638l.983.983L5.603 9M7.57 4h3.93M7.57 10h3.93"
                stroke="#222324"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
