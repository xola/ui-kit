import React from "react";
import { createIcon } from "../helpers/icon";

export const PhotosIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.565 2h-9.13A.435.435 0 002 2.435v9.13c0 .24.195.435.435.435h9.13c.24 0 .435-.195.435-.435v-9.13A.435.435 0 0011.565 2zM2 10.26h10"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2 9.665s1.083-2.707 2.436-2.707c1.354 0 2.437 1.625 2.437 1.625l1.63-2.8h-.006a.903.903 0 011.24-.324c.151.086.27.216.352.373L12 9.655"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
