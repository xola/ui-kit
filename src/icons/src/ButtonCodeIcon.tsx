import React from "react";
import { createIcon } from "./helpers/icon";

export const ButtonCodeIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M10.365 14.881h2.844a.643.643 0 00.452-1.1L8.519 8.705a.643.643 0 00-1.094.457v7.069a.643.643 0 001.092.46l1.848-1.81z"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.014 10.447H3.407A1.607 1.607 0 011.8 8.839V4.018a1.607 1.607 0 011.607-1.607h11.25a1.607 1.607 0 011.607 1.607v4.821a1.607 1.607 0 01-1.607 1.608h-.804"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.572 5.529l1.543 1.286L11.572 8.1"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
