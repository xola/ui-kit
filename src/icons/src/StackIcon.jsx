import React from "react";
import { createIcon } from "./helpers/icon";

export const StackIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M10.851 8.4H3.25A.249.249 0 003 8.65v2.203c0 .137.111.248.249.248h7.602a.248.248 0 00.249-.248V8.649a.249.249 0 00-.248-.249z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.752 5.7H4.149a.249.249 0 00-.249.248v2.203c0 .138.112.249.249.249h7.603A.249.249 0 0012 8.15V5.948a.249.249 0 00-.248-.248zM10.851 3H3.25A.249.249 0 003 3.249V5.45c0 .138.111.249.249.249h7.602a.249.249 0 00.249-.249V3.25A.249.249 0 0010.852 3z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

StackIcon.tags = ["balance", "collect", "money"];
