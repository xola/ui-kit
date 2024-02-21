import React from "react";
import { createIcon } from "./helpers/icon";

export const RoundedSquareIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect
                x={2.579}
                y={2.578}
                width={12.843}
                height={12.843}
                rx={3.009}
                stroke="currentColor"
                strokeWidth={1.3}
            />
        </svg>
    );
});
