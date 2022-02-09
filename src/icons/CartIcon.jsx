import React from "react";
import { createIcon } from "../helpers/icon";

export const CartIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2 2.031l2.494 6.86h.014a.678.678 0 00.623.424h4.764c.265 0 .504-.159.61-.41l1.433-3.981c.159-.345 0-.73-.332-.876a.604.604 0 00-.265-.066H2.776M8.965 11.318h.013c-.172-.013-.331.146-.331.319 0 .172.159.331.331.331.186 0 .332-.159.345-.331a.33.33 0 00-.318-.345M5.648 11.318h.013c-.172-.013-.332.146-.332.319 0 .172.16.331.332.331.186 0 .332-.159.345-.331a.33.33 0 00-.318-.345"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
