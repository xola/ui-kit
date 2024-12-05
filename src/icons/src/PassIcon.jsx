import React from "react";
import { createIcon } from "./helpers/icon";

export const PassIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" {...props}>
            <path
                d="M7.742 6.176a1.617 1.617 0 11-2.286 2.286 1.617 1.617 0 012.286-2.286z"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.929 13.606V4.295c0-.81.656-1.467 1.466-1.467h11.466c.794 0 1.438.643 1.438 1.437v9.34c0 .795-.644 1.438-1.438 1.438H3.367a1.437 1.437 0 01-1.437-1.437zM11.269 7.14h2.873M12.993 10.013h-1.724"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.182 12.169a2.278 2.278 0 00-2.12-1.437h-.928a2.28 2.28 0 00-2.118 1.437"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

PassIcon.tags = ["membership", "pass"];
