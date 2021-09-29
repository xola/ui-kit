import React from "react";
import { createIcon } from "../helpers/icon";

export const XrayIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M9.825 19.3h3.689M11.669 19.5v.738M9.825 16.942c0 .2.162.362.369.362h2.95-.007c.2 0 .369-.17.369-.369v-.627a6.334 6.334 0 004.788-6.027l-.008-.008a6.462 6.462 0 00-6.647-6.27A6.45 6.45 0 005 10.266a6.33 6.33 0 004.795 6.02l.03.656z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
