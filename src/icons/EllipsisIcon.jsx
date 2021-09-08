import React from "react";
import { createIcon } from "../helpers/icon";

export const EllipsisIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)" fill="currentColor">
                <path d="M14.166 7a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM4.166 7a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM9.166 7a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
