import React from "react";
import { createIcon } from "./helpers/icon";

export const EyeClosedIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7 11.578a4.552 4.552 0 01-1.64-.325M12.824 7.296C11.584 9.59 9.292 11.578 7 11.578M11.642 4.97c.453.53.855 1.109 1.182 1.713a.647.647 0 010 .613M2.412 11.578L11.59 2.4M5.541 8.449a2.065 2.065 0 012.92-2.92"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.307 3.682C9.293 2.897 8.147 2.4 7.001 2.4c-2.292 0-4.583 1.988-5.823 4.283a.647.647 0 000 .613c.62 1.146 1.502 2.216 2.516 3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
