import React from "react";
import { createIcon } from "./helpers/icon";

export const BookIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19" {...props}>
            <g clipPath="url(#clip0_3383_154006)">
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.179"
                    d="M9.322 4.507a4.774 4.774 0 00-6.14-.515 1.487 1.487 0 00-.61 1.213v9.717c0 .58.619.917 1.131.644a4.774 4.774 0 015.62.84m0-11.899v11.898m0-11.898a4.774 4.774 0 016.14-.515c.389.277.61.736.61 1.213v9.717c0 .58-.62.918-1.132.644a4.774 4.774 0 00-5.619.84"
                />
            </g>
            <defs>
                <clipPath id="clip0_3383_154006">
                    <path fill="#fff" d="M0 0H18V18H0z" transform="translate(.322 .757)" />
                </clipPath>
            </defs>
        </svg>
    );
});

BookIcon.tags = ["book", "read", "readme", "help"];
