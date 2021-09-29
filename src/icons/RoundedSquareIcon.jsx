import React from "react";
import { createIcon } from "../helpers/icon";

export const RoundedSquareIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 15 15" width={15} height={15} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x="0.5" y="0.499878" width="13.85" height="13.85" rx="3.15896" stroke="currentColor" />
        </svg>
    );
});
