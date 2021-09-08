import React from "react";
import { createIcon } from "../helpers/icon";

export const HomeIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.128 6.352v5.834M12.204 6.352v5.834M8.962 12.185V9.593a1.296 1.296 0 00-2.592 0v2.592M1.833 12.186h11.666M3.175 6.352c-.99-.007-1.636-.988-1.207-1.833l1-1.97c.229-.449.708-.734 1.234-.734h6.928c.526 0 1.005.285 1.234.734l1 1.97c.43.845-.216 1.826-1.206 1.833-.827 0-1.497-.565-1.497-1.262v-.028c0 .712-.67 1.29-1.497 1.29-.827 0-1.497-.578-1.497-1.29 0 .712-.67 1.29-1.497 1.29-.826 0-1.496-.578-1.496-1.29v.028c-.002.697-.672 1.262-1.5 1.262v0z" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
