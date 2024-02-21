import React from "react";
import { createIcon } from "../helpers/icon";

export const TripadvisorIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M14.646 7.026l1.104-1.201h-2.445a7.643 7.643 0 00-8.602 0H2.25l1.104 1.2a3.373 3.373 0 004.565 4.967L9 13.17l1.08-1.176a3.373 3.373 0 005.667-2.474 3.364 3.364 0 00-1.1-2.493zM5.626 11.8a2.283 2.283 0 110-4.565 2.283 2.283 0 010 4.565zM9 9.453C9 7.95 7.907 6.662 6.467 6.11a6.586 6.586 0 015.066 0C10.093 6.662 9 7.95 9 9.453zm3.372 2.348a2.283 2.283 0 110-4.566 2.283 2.283 0 010 4.566zm-6.746-3.48A1.197 1.197 0 106.823 9.52v-.003a1.195 1.195 0 00-1.197-1.194zm6.746 0a1.197 1.197 0 100 2.394 1.197 1.197 0 000-2.393z"
                fill="#000"
            />
        </svg>
    );
});

TripadvisorIcon.tags = ["logo", "trip advisor review express", "tare"];
