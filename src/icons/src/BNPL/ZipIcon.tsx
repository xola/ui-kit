import React from "react";
import { createIcon } from "../helpers/icon";

export const ZipIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <rect width="24" height="24" rx="12" fill="#AA8FFF" />
            <path
                d="M5.06927 14.711L5.48405 18.0887H20L19.5251 14.2204H12.7567L12.6979 13.7403L18.9314 9.38485L18.5153 6H3.99999L4.47487 9.86822H11.2544L11.3138 10.3516L5.06927 14.711Z"
                fill="#1A0826"
            />
        </svg>
    );
});

ZipIcon.tags = ["payment", "zip", "bnpl"];
