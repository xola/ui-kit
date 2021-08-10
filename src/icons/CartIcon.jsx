import React from "react";
import { createIcon } from "../helpers/icon";

export const CartIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.666 2.031l2.494 6.86h.014a.678.678 0 00.623.424h4.763c.266 0 .505-.159.61-.41l1.434-3.981c.159-.345 0-.73-.332-.876a.604.604 0 00-.265-.066H3.442M9.632 11.318h.013c-.173-.013-.332.146-.332.319 0 .172.16.332.332.332.186 0 .332-.16.345-.332a.33.33 0 00-.319-.345M6.314 11.318h.013c-.172-.013-.332.146-.332.319 0 .172.16.332.332.332.186 0 .332-.16.345-.332a.33.33 0 00-.318-.345"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
