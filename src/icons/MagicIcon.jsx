import React from "react";
import { createIcon } from "../helpers/icon";

export const MagicIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.281 6.02l1.426 1.442M1.666 10.697l6.038-6.112h0a.664.664 0 01.946 0l.473.48v0a.683.683 0 010 .957L3.217 12M4.3 2.355v1.354M4.97 3.032H3.63M7.647 1v1.355M8.316 1.677H6.977M11.662 3.37v2.033M12.666 4.387h-2.008"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
