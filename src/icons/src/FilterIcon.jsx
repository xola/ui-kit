import React from "react";
import { createIcon } from "./helpers/icon";

export const FilterIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" {...props}>
            <path
                d="M6.107 13.5h5.786M4.662 9h8.679M3.215 4.5h11.571"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

FilterIcon.tags = ["filter", "custom reports"];
