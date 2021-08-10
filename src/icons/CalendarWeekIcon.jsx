import React from "react";
import { createIcon } from "../helpers/icon";

export const CalendarWeekIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12.426 2.87h-9.52a.24.24 0 00-.24.24v8.65c0 .133.108.24.24.24h9.52a.24.24 0 00.24-.24V3.11a.24.24 0 00-.24-.24z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.8 9.455l-.073.145H7.666l.027-.055 1.359-2.7.01-.02v-.698H6.566V6.893h1.53L6.8 9.455z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={0.2}
            />
            <path d="M4.84 2v2.174M10.492 2v2.174" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});
