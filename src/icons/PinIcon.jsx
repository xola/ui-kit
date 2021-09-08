import React from "react";
import { createIcon } from "../helpers/icon";

export const PinIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.657 5.86v-.1a4.01 4.01 0 118.018 0v.1c0 2.018-2.556 5.058-3.586 6.2a.568.568 0 01-.846 0c-1.03-1.143-3.586-4.182-3.586-6.2v0z" />
                <path d="M6.5 5.807a1.166 1.166 0 102.333 0v-.022a1.166 1.166 0 10-2.334 0" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
