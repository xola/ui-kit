import React from "react";
import { createIcon } from "../helpers/icon";

export const HiddenIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 15 16" width={15} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path clipRule="evenodd" d="M.666 15l14-14-14 14v0z" stroke="currentColor" strokeWidth={0.05} />
            <path d="M.666 1l14 14" stroke="currentColor" strokeWidth={0.05} />
            <path
                d="M.666 10.115h14M.666 6.031h14M.666 7.781h14"
                stroke="currentColor"
                strokeWidth={0.05}
                strokeLinecap="square"
            />
            <path d="M9.708 15V1M5.624 15V1M7.666 15V1" stroke="currentColor" strokeWidth={0.05} />
            <path
                clipRule="evenodd"
                d="M10.583 8a2.917 2.917 0 10-5.834 0 2.917 2.917 0 005.834 0v0z"
                stroke="currentColor"
                strokeWidth={0.05}
            />
            <path
                d="M7.666 14.417a6.417 6.417 0 110-12.834 6.417 6.417 0 010 12.834"
                stroke="currentColor"
                strokeWidth={0.05}
            />
            <path
                d="M12.333 13.542H2.999a.878.878 0 01-.875-.875V3.333c0-.48.394-.875.875-.875h9.334c.48 0 .875.394.875.875v9.334a.878.878 0 01-.875.875"
                stroke="currentColor"
                strokeWidth={0.05}
            />
            <path
                d="M11.458 14.417H3.874A.878.878 0 013 13.542V2.458c0-.48.394-.875.875-.875h7.584c.48 0 .875.394.875.875v11.084a.878.878 0 01-.875.875"
                stroke="currentColor"
                strokeWidth={0.05}
            />
            <path
                d="M13.208 12.667H2.124a.878.878 0 01-.875-.875V4.208c0-.48.394-.875.875-.875h11.084c.48 0 .875.394.875.875v7.584a.878.878 0 01-.875.875"
                stroke="currentColor"
                strokeWidth={0.05}
            />
            <path
                d="M2.85 12.367L12.257 3.3M6.145 11.328c.524.163 1.07.244 1.62.24 2.186.036 4.404-1.501 5.773-3.007a.887.887 0 000-1.188 10.968 10.968 0 00-1.64-1.47M9.052 4.517a5.093 5.093 0 00-1.287-.15c-2.15-.036-4.373 1.468-5.771 3.005a.887.887 0 000 1.188c.425.465.889.893 1.386 1.28M5.766 7.967a2 2 0 012-2M9.769 7.966a2 2 0 01-2 2.001"
                stroke="currentColor"
                strokeWidth={1.015}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
