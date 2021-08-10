import React from "react";
import { createIcon } from "../helpers/icon";

export const AtIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M10.388 7a2.722 2.722 0 11-5.445 0 2.722 2.722 0 015.445 0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.387 7v1.166a1.555 1.555 0 103.111 0V6.999a5.833 5.833 0 10-2.333 4.667"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
