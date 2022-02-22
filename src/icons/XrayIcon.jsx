import React from "react";
import { createIcon } from "../helpers/icon";

export const XrayIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M5.769 11.865h2.498M7.019 12v.5M5.768 10.268c0 .135.11.244.25.244h2-.006c.135 0 .25-.114.25-.25v-.424a4.29 4.29 0 003.244-4.083L11.5 5.75a4.377 4.377 0 00-4.503-4.248A4.369 4.369 0 002.5 5.745a4.288 4.288 0 003.248 4.078l.02.445z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
