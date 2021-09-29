import React from "react";
import { createIcon } from "../helpers/icon";

export const RoundedSquareIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 24 24" width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x="5.5" y="5.5" width="13.85" height="13.85" rx="3.15896" stroke="currentColor" />
        </svg>
    );
});
