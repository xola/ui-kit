import React from "react";
import { createIcon } from "../helpers/icon";

export const EyeIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.683 5.218a1.828 1.828 0 100 3.656 1.828 1.828 0 000-3.656v0z" />
                <path d="M13.624 6.875c-.61-.69-3.04-3.228-5.943-3.228-2.909 0-5.337 2.533-5.943 3.223h-.005a.25.25 0 000 .34c.605.689 3.034 3.221 5.938 3.221 2.903 0 5.332-2.534 5.938-3.227h-.006a.268.268 0 000-.345l.021.016z" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
