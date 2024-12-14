import React from "react";
import { createIcon } from "./helpers/icon";

export const ClockManualIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.9 1C5.73309 1 4.59239 1.34603 3.62214 1.99433C2.65189 2.64263 1.89567 3.56408 1.44911 4.64217C1.00256 5.72025 0.885717 6.90654 1.11337 8.05103C1.34102 9.19552 1.90294 10.2468 2.72807 11.0719C3.5532 11.8971 4.60448 12.459 5.74897 12.6866C6.89346 12.9143 8.07975 12.7974 9.15783 12.3509C10.2359 11.9043 11.1574 11.1481 11.8057 10.1779C12.454 9.20761 12.8 8.06691 12.8 6.9"
                stroke="#222324"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M10.1768 3.62231H12.799" stroke="#222324" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.1768 1.65576H12.799" stroke="#222324" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.52324 7.22787H6.57324V3.62231" stroke="#222324" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});

ClockManualIcon.tags = ["clock", "manual", "watch", "fly", "on the fly"];
