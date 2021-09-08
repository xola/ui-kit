import React from "react";
import { createIcon } from "../helpers/icon";

export const BalloonIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.458 5.196c0 2.152-1.744 4.87-3.896 4.87s-3.896-2.718-3.896-4.87v0a3.896 3.896 0 117.792 0v0zM7.5 10.062s-.551 1.942.547 2.738"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
