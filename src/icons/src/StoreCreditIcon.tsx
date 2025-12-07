import React from "react";
import { createIcon } from "./helpers/icon";

export const StoreCreditIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.462 6.353v5.833M11.538 6.353v5.833M8.296 12.185V9.593a1.296 1.296 0 00-2.592 0v2.592M1.167 12.186h11.667M2.509 6.352c-.99-.007-1.636-.988-1.207-1.833l1-1.97c.229-.449.708-.734 1.234-.734h6.928c.526 0 1.006.285 1.234.734l1 1.97c.43.845-.216 1.826-1.206 1.833-.827 0-1.497-.565-1.497-1.262v-.028c0 .712-.67 1.29-1.497 1.29-.826 0-1.497-.578-1.497-1.29 0 .712-.67 1.29-1.497 1.29-.826 0-1.496-.578-1.496-1.29v.028c-.002.697-.672 1.262-1.499 1.262v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
