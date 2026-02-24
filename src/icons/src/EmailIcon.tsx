import React from "react";
import { createIcon } from "./helpers/icon";

export const EmailIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.295 3h9.41c.577 0 1.045.468 1.045 1.046v6.795c0 .578-.468 1.045-1.045 1.045h-9.41a1.045 1.045 0 01-1.045-1.045V4.046C1.25 3.468 1.718 3 2.295 3v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.326 3.658l4.916 3.516c.444.317 1.04.318 1.485.001l4.944-3.526"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
