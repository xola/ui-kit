import React from "react";
import { createIcon } from "./helpers/icon";

export const LinkIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.764 9.467L4.731 11.5h-.005a1.92 1.92 0 01-2.711-.005l-.452-.451a1.916 1.916 0 01-.005-2.709L4.49 5.397v-.005a1.909 1.909 0 012.707 0l.447.452"
                stroke="currentColor"
                strokeWidth={0.917}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.312 3.597l2.029-2.031h-.005a1.91 1.91 0 012.706-.008c.75.745 0 0 0 0l.447.447L11.484 2a1.918 1.918 0 010 2.706L8.549 7.638v-.004a1.924 1.924 0 01-2.711 0l-.005-.005-.452-.452"
                stroke="currentColor"
                strokeWidth={0.917}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
