import React from "react";
import { createIcon } from "./helpers/icon";

export const ShirtIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M12.984 5.302L10.943 3.34l-.005-.005a2.624 2.624 0 00-1.816-.733H4.94c-.68 0-1.33.262-1.816.733l-2.04 1.962h-.006a.257.257 0 00-.005.366l1.214 1.214-.005-.005c.094.094.246.1.35.016l1.492-1.162v6.018c0 .14.115.256.261.256H9.62h-.005c.141 0 .261-.12.261-.262V5.721l1.492 1.155c.1.084.256.079.35-.02l1.214-1.22h-.005c.1-.105.1-.272-.005-.372l-.005-.005.068.043zM5.473 2.613a1.567 1.567 0 103.134-.01"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
