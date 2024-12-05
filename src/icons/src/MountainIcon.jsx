import React from "react";
import { createIcon } from "./helpers/icon";

export const MountainIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M2.867 10.153L7.403 2.95v-.006a.667.667 0 011.061-.005L13 10.142l-10.133.011z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.868 10.153H1l1.868-2.935h-.006a.71.71 0 01.534-.272l-.006-.005c.208.005.4.101.534.261l.347.694M5.244 6.377l1.25 1.057-.005-.005a.534.534 0 00.72-.032l.342-.347h-.006a.527.527 0 01.753-.006l.341.342a.533.533 0 00.72.027l1.228-1.04"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

MountainIcon.tags = ["product", "listing", "experience"];
