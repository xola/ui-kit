import React from "react";
import { createIcon } from "./helpers/icon";

export const ChipIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.429 2.714V1M7 2.714V1M9.571 2.714V1M4.429 13v-1.714M7 13v-1.714M9.571 13v-1.714M11.286 4.428H13M11.286 7H13M11.286 9.572H13M1 4.428h1.714M1 7h1.714M1 9.572h1.714M9.571 2.714H4.428c-.947 0-1.714.768-1.714 1.715v5.143c0 .946.767 1.714 1.714 1.714h5.143c.947 0 1.714-.768 1.714-1.714V4.429c0-.947-.767-1.715-1.714-1.715z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.029 5.4H6.058a.657.657 0 00-.658.657v1.971c0 .363.295.658.658.658h1.971a.657.657 0 00.657-.658V6.057A.657.657 0 008.03 5.4z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

ChipIcon.tags = ["payment", "custom payment"];
