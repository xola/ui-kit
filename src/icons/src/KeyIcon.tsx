import React from "react";
import { createIcon } from "./helpers/icon";

export const KeyIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M10.886 7.317L9.695 6.125l1.107-1.109 1.187 1.186a.789.789 0 001.108-.02.79.79 0 000-1.093l-1.192-1.191.552-.553a.795.795 0 000-1.113.79.79 0 00-1.113-.005L5.718 7.85v0a2.745 2.745 0 00-3.721 1.107 2.74 2.74 0 104.823 2.602 2.742 2.742 0 00-.005-2.612L8.561 7.2l1.186 1.192c.303.303.8.303 1.108-.006a.79.79 0 00-.005-1.113l.036.043z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.435 9.297a.98.98 0 100 1.96.98.98 0 000-1.96z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
