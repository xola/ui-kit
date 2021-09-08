import React from "react";
import { createIcon } from "../helpers/icon";

export const EquipmentIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.5 9.98a1.557 1.557 0 112.55-1.67.39.39 0 00.64.133l1.215-1.215a.779.779 0 000-1.101L11.659 4.88a1.557 1.557 0 10-1.91-1.907L8.502 1.728a.779.779 0 00-1.101 0L6.273 2.856a.39.39 0 00.06.6 1.557 1.557 0 11-2.157 2.158.39.39 0 00-.6-.06L2.443 6.677a.779.779 0 000 1.1l4.404 4.405a.779.779 0 001.101 0l1.216-1.216a.39.39 0 00-.134-.638A1.54 1.54 0 018.5 9.98z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
