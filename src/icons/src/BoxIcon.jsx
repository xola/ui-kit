import React from "react";
import { createIcon } from "./helpers/icon";

export const BoxIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
            <g clipPath="url(#clip0_1621_3066)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.25 9.35723V4.64273C12.25 4.22564 12.0277 3.84065 11.6667 3.6324L7.58333 1.27515C7.22225 1.0669 6.77775 1.0669 6.41667 1.27515L2.33333 3.63181C1.97225 3.84064 1.75 4.22564 1.75 4.64273V9.35781C1.75 9.77489 1.97225 10.1599 2.33333 10.3681L6.41667 12.7254C6.77775 12.9336 7.22225 12.9336 7.58333 12.7254L11.6667 10.3681C12.0277 10.1593 12.25 9.77431 12.25 9.35723Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M7 12.88V7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 7L12.0925 4.06" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.90723 4.06L6.99973 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_1621_3066">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
});

BoxIcon.tags = ["add-ons", "addons", "merchandise", "other", "payment"];
