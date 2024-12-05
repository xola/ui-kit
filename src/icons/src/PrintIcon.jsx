import React from "react";
import { createIcon } from "./helpers/icon";

export const PrintIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M9.674 4.778V2.556A.556.556 0 009.12 2H4.88a.556.556 0 00-.556.556v2.222M9.777 6.444h.556M4.222 9.778H2.556A.556.556 0 012 9.222V5.333c0-.306.249-.555.556-.555h8.888c.307 0 .556.249.556.555v3.89a.556.556 0 01-.556.555H9.778"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.223 12H4.778a.556.556 0 01-.555-.556V8.111h5.555v3.333a.556.556 0 01-.555.556z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
