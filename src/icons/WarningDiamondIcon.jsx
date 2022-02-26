import React from "react";
import { createIcon } from "../helpers/icon";

export const WarningDiamondIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12.587 6.614L7.358 1.386a.545.545 0 00-.771 0L1.358 6.614a.545.545 0 000 .772l5.229 5.228a.546.546 0 00.771 0l5.229-5.228a.545.545 0 000-.772zM6.985 4.286v3.06"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.978 9.196a.127.127 0 00-.131.136c0 .07.06.13.136.13a.134.134 0 00.126-.141l-.006-.005c-.005-.077-.065-.137-.136-.137M6.985 9.196H6.98"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

WarningDiamondIcon.tags = ["exclamation"];