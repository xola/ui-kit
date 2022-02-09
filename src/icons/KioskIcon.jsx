import React from "react";
import { createIcon } from "../helpers/icon";

export const KioskIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.167 2H2.833A.833.833 0 002 2.833v5.278c0 .46.373.833.833.833h8.334c.46 0 .833-.373.833-.833V2.833A.833.833 0 0011.167 2zM5.75 12.278L7 10.61M8.25 12.278L7 10.61M7 10.611V8.945"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
