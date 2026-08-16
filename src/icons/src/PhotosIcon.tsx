import React from "react";
import { createIcon } from "./helpers/icon";

export const PhotosIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12 9.222L9.615 6.837a.555.555 0 00-.786 0L6.444 9.222"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.333 12H3.667C2.747 12 2 11.254 2 10.333V3.667C2 2.747 2.746 2 3.667 2h6.666C11.253 2 12 2.746 12 3.667v6.666c0 .92-.746 1.667-1.667 1.667z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.222 12L5.726 8.504a.555.555 0 00-.785 0l-2.693 2.693"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx={5.333} cy={5.326} r={0.556} fill="currentColor" />
        </svg>
    );
});

PhotosIcon.tags = ["image", "background"];
