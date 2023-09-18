import React from "react";
import { createIcon } from "../helpers/icon";

export const LightningIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 8 14" width={8} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.31884 6.63147C7.36969 6.54881 7.39757 6.45408 7.39961 6.35705C7.40165 6.26003 7.37777 6.16421 7.33044 6.07949C7.2831 5.99477 7.21403 5.92421 7.13033 5.87508C7.04664 5.82595 6.95136 5.80003 6.85431 5.8H4.99991V1L1.08098 7.36907C1.03009 7.45168 1.00218 7.54639 1.00012 7.6434C0.998069 7.74041 1.02195 7.83621 1.0693 7.92091C1.11665 8.00561 1.18575 8.07613 1.26947 8.12519C1.35318 8.17425 1.44848 8.20008 1.54551 8.2H3.39991V13L7.31884 6.63147Z"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

LightningIcon.tags = ["lightning", "bug", "problem"];
