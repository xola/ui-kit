import React from "react";
import { createIcon } from "../../helpers/icon";

export const TikTokIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M15.187 7.786a5.54 5.54 0 01-3.238-1.035v4.713a4.286 4.286 0 11-3.698-4.248v2.371a1.968 1.968 0 101.377 1.877V2.25h2.321c-.002.196.015.392.05.585A3.221 3.221 0 0013.42 4.95a3.203 3.203 0 001.767.532v2.304z"
                fill="#000"
            />
        </svg>
    );
});

TikTokIcon.tags = ["logo", "social media"];
