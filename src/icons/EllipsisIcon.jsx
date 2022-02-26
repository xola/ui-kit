import React from "react";
import { createIcon } from "../helpers/icon";

export const EllipsisIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
            <path
                d="M13.5 7a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM3.5 7a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM8.5 7a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
                fill="#222324"
            />
        </svg>
    );
});

EllipsisIcon.tags = ["three", "dots"];
