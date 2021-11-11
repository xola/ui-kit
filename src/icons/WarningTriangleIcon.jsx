import React from "react";
import { createIcon } from "../helpers/icon";

export const WarningTriangleIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12.158 11.81a.277.277 0 01-.27.436H2.112a.278.278 0 01-.27-.437l4.94-9.879c.12-.24.316-.24.437 0l4.94 9.88zM7 8.196V4.775"
                stroke="#000"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.996 10.049a.12.12 0 00-.11.078.125.125 0 00.117.167h.001a.12.12 0 00.11-.079.125.125 0 00-.115-.167H7"
                stroke="#000"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
