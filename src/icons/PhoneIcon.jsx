import React from "react";
import { createIcon } from "../helpers/icon";

export const PhoneIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.986 11.573l.006.004a2.705 2.705 0 003.366-.37l.378-.378a.902.902 0 000-1.275l-1.594-1.593a.903.903 0 00-1.276 0v0a.9.9 0 01-1.275 0L6.041 5.41a.902.902 0 010-1.276v0a.9.9 0 000-1.275L4.445 1.264a.903.903 0 00-1.275 0l-.379.378a2.706 2.706 0 00-.37 3.365l.005.006a24.411 24.411 0 006.56 6.56v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
