import React from "react";
import { createIcon } from "./helpers/icon";

export const DisputeIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" {...props}>
            <path
                d="M13.253 6.614L8.024 1.386a.545.545 0 00-.771 0L2.024 6.614a.545.545 0 000 .772l5.229 5.228a.546.546 0 00.771 0l5.229-5.228a.545.545 0 000-.772zM7.651 4.286v3.06"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.644 9.196a.127.127 0 00-.131.136c0 .07.06.13.136.13a.134.134 0 00.126-.141l-.006-.005c-.005-.077-.065-.137-.136-.137M7.651 9.195h-.005"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
