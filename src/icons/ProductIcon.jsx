import React from "react";
import { createIcon } from "../helpers/icon";

export const ProductIcon = createIcon((props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14" {...props}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.186 5.498a.22.22 0 01-.217.217.204.204 0 01-.113-.035l-1.084-.65-1.31.68v-.004a.222.222 0 01-.321-.2V2h3.037l.008 3.498z"
        />
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.222 2.022h-9.11a.434.434 0 00-.434.434v9.11c0 .24.194.434.434.434h9.11c.24 0 .434-.194.434-.434v-9.11a.434.434 0 00-.434-.434z"
        />
    </svg>
));

ProductIcon.displayName = "ProductIcon";
