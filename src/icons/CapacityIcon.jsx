import React from "react";
import { createIcon } from "../helpers/icon";

export const CapacityIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx={4.166} cy={3.5} r={1.444} stroke="currentColor" />
            <path
                d="M12.61 3.5a1.444 1.444 0 11-2.888 0 1.444 1.444 0 012.889 0zM12.61 10.5a1.444 1.444 0 11-2.888 0 1.444 1.444 0 012.889 0zM5.61 10.5a1.444 1.444 0 11-2.888 0 1.444 1.444 0 012.888 0z"
                stroke="currentColor"
            />
        </svg>
    );
});
