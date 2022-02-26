import React from "react";
import { createIcon } from "../helpers/icon";

export const TrashIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g
                clipPath="url(#prefix__clip0_141_9201)"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M1.828 3.324H12.15M8.095 1.85H5.883v0a.737.737 0 00-.737.737v.737h3.686v-.737 0a.737.737 0 00-.737-.737v0zM5.883 9.591V5.905M8.095 9.591V5.905M10.363 11.495v0a.737.737 0 01-.735.677H4.35v0a.737.737 0 01-.735-.677l-.681-8.17h8.11l-.681 8.17z" />
            </g>
            <defs>
                <clipPath id="prefix__clip0_141_9201">
                    <path fill="#fff" transform="translate(1.09 1.113)" d="M0 0h11.796v11.796H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});

TrashIcon.tags = ["delete", "remove", "bin"];