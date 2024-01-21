import React from "react";
import { createIcon } from "./helpers/icon";

export const BoxIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.679 3.947a.428.428 0 01.321.417V9.8a.429.429 0 01-.3.408l-4.771 1.59h-.005a.461.461 0 01-.286-.005l-4.351-1.585A.435.435 0 012 9.8V4.347a.424.424 0 01.321-.422l4.56-1.185v-.004a.37.37 0 01.217 0l4.58 1.211zM6.794 5.345v6.513"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.885 4.069L6.794 5.34l-4.66-1.272"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

BoxIcon.tags = ["add-ons", "addons", "merchandise", "other", "payment"];
