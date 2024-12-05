import React from "react";
import { createIcon } from "./helpers/icon";

export const CommentIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" {...props}>
            <path
                d="M11.881 10.107H8.334l-2.796 2.229h-.009a.23.23 0 01-.3-.034.227.227 0 01-.05-.141v-2.07H3.5a.839.839 0 01-.835-.844v0-5.843a.827.827 0 01.827-.843h8.347-.009a.825.825 0 01.835.826V9.23c0 .459-.376.835-.835.835h-.008l.058.042zM5.204 5.103h5.008M5.204 7.607h3.339"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
