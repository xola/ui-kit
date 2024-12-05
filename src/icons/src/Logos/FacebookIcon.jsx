import React from "react";
import { createIcon } from "../helpers/icon";

export const FacebookIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" {...props}>
            <path
                d="M7.3 15.75V9.415H5.625v-2.28H7.3V5.187c0-1.531.99-2.937 3.27-2.937.922 0 1.605.088 1.605.088l-.054 2.13s-.696-.006-1.456-.006c-.822 0-.953.378-.953 1.007v1.666h2.475l-.108 2.28H9.712v6.335H7.3z"
                fill="#000"
            />
        </svg>
    );
});

FacebookIcon.tags = ["logo", "social media"];
