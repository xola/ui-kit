import React from "react";
import { createIcon } from "../helpers/icon";

export const CrownIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.867 11.07c0 .488.418.887.95.887h10.92c.522 0 .95-.399.95-.887V6.28a.47.47 0 00-.485-.443.474.474 0 00-.313.107L11.869 8.4 9.381 5.687a.504.504 0 00-.674-.054.249.249 0 00-.057.045L6.162 8.383l-2.516-2.35v-.001a.503.503 0 00-.674-.01.403.403 0 00-.143.311l.038 4.737z"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
