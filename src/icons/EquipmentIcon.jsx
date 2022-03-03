import React from "react";
import { createIcon } from "../helpers/icon";

export const EquipmentIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 12" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.834 9.98a1.557 1.557 0 112.55-1.67.39.39 0 00.64.133l1.215-1.215a.779.779 0 000-1.101L10.993 4.88a1.557 1.557 0 10-1.91-1.907L7.836 1.728a.779.779 0 00-1.101 0L5.607 2.856a.39.39 0 00.06.6A1.557 1.557 0 113.51 5.614a.39.39 0 00-.6-.06L1.777 6.677a.779.779 0 000 1.1l4.404 4.405a.779.779 0 001.101 0L8.5 10.966a.39.39 0 00-.134-.638 1.54 1.54 0 01-.531-.348z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

EquipmentIcon.tags = ["inventory"];
