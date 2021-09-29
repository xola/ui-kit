import React from "react";
import { createIcon } from "../helpers/icon";

export const CrmIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 20 15" width={20} height={15} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.98 8.957a1.99 1.99 0 100-3.979 1.99 1.99 0 000 3.979zM13.654 14.4h5.304a4.102 4.102 0 00-6.012-2.547M10.725 14.4A4.863 4.863 0 101 14.4h9.725zM5.813 6.747a2.873 2.873 0 100-5.747 2.873 2.873 0 000 5.747z"
            ></path>
        </svg>
    );
});
