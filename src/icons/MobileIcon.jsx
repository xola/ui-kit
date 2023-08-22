import React from "react";
import { createIcon } from "../helpers/icon";

export const MobileIcon = createIcon((props) => {
    return (
        <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
                clipPath="url(#clip0_9896_373783)"
            >
                <path d="M13.5 14.25a1.5 1.5 0 01-1.5 1.5H6a1.5 1.5 0 01-1.5-1.5V3.75A1.5 1.5 0 016 2.25h6a1.5 1.5 0 011.5 1.5v10.5z"></path>
                <path d="M10.877 2.25v1.5a.375.375 0 01-.375.375h-3a.375.375 0 01-.375-.375v-1.5"></path>
            </g>
            <defs>
                <clipPath id="clip0_9896_373783">
                    <path fill="#fff" d="M0 0H18V18H0z"></path>
                </clipPath>
            </defs>
        </svg>
    );
});

MobileIcon.tags = ["mobile", "phone", "iphone", "android", "ios"];
