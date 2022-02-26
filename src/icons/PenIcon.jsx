import React from "react";
import { createIcon } from "../helpers/icon";

export const PenIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.892 2.773a1.509 1.509 0 00-2.144.015L3.734 8.802l-.735 2.864 2.864-.735 6.015-6.014a1.509 1.509 0 00.014-2.144v0zM9.577 2.96l2.129 2.13M3.734 8.802l2.132 2.128"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

PenIcon.tags = ["write"];