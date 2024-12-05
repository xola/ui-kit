import React from "react";
import { createIcon } from "./helpers/icon";

export const BalloonIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M10.792 5.196c0 2.152-1.744 4.87-3.896 4.87S3 7.348 3 5.196v0a3.896 3.896 0 117.792 0v0zM6.833 10.062s-.55 1.941.548 2.738"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

BalloonIcon.tags = ["child", "demographic"];
