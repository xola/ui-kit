import React from "react";
import { createIcon } from "../helpers/icon";

export const KioskIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" fill="none" viewBox="0 0 14 15" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.167 2.975H2.833A.833.833 0 002 3.808v5.278c0 .46.373.834.833.834h8.334c.46 0 .833-.374.833-.834V3.808a.833.833 0 00-.833-.833zM5.75 13.253L7 11.586M8.25 13.253L7 11.586M7 11.586V9.92"
            />
        </svg>
    );
});
