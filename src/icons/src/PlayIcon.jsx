import React from "react";
import { createIcon } from "./helpers/icon";

export const PlayIcon = createIcon((props) => {
    return (
        <svg width="19" height="19" fill="none" viewBox="0 0 19 19" {...props}>
            <g clipPath="url(#clip0_3383_154011)">
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.179"
                    d="M7.284 4.462l6.987 4.133a1.35 1.35 0 010 2.324L7.284 15.05a1.35 1.35 0 01-2.038-1.162V5.625a1.35 1.35 0 012.038-1.163z"
                />
            </g>
            <defs>
                <clipPath id="clip0_3383_154011">
                    <path fill="#fff" d="M0 0H18V18H0z" transform="translate(.713 .757)" />
                </clipPath>
            </defs>
        </svg>
    );
});

PlayIcon.tags = ["play", "video", "audio", "music"];
