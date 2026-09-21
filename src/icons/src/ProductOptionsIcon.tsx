import React from "react";
import { createIcon } from "./helpers/icon";

export const ProductOptionsIcon = createIcon((props) => {
    return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_26236_64109)">
                <path
                    d="M5.83899 14.193L3.16799 16.088C2.79299 16.354 2.63599 16.834 2.78099 17.27L3.78499 20.285C3.92599 20.712 4.32499 21 4.77499 21H8.11099C8.56099 21 8.95999 20.712 9.10199 20.285L10.106 17.27C10.251 16.834 10.094 16.354 9.71899 16.088L7.04799 14.193C6.68499 13.936 6.20099 13.936 5.83899 14.193Z"
                    stroke="currentColor"
                    strokeWidth={1.5}
                />
                <path
                    d="M4.19299 3.5H8.69299C9.24499 3.5 9.69299 3.948 9.69299 4.5V9C9.69299 9.552 9.24499 10 8.69299 10H4.19299C3.64099 10 3.19299 9.552 3.19299 9V4.5C3.19299 3.948 3.64099 3.5 4.19299 3.5Z"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M17.633 14C15.7 14 14.133 15.567 14.133 17.5C14.133 19.433 15.7 21 17.633 21C19.566 21 21.133 19.433 21.133 17.5C21.133 15.567 19.566 14 17.633 14Z"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16.605 4.07L14.058 8.146C13.553 8.953 14.134 10 15.085 10H20.18C21.132 10 21.712 8.953 21.207 8.146L18.661 4.07C18.186 3.31 17.08 3.31 16.605 4.07Z"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_26236_64109">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
});

ProductOptionsIcon.tags = ["variant", "variants", "options", "product", "merchandise"];
