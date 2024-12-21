import React from "react";
import { createIcon } from "./helpers/icon";

export const RosterIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M5.865 3.887h3.837M3.947 6.765h5.755M3.947 9.642h5.755M2.029 1.969A.95.95 0 012.979 1h7.672-.01c.528-.01.96.422.96.95v9.59c0 .528-.432.96-.96.96H2.96A.964.964 0 012 11.531v0l.029-9.562z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
