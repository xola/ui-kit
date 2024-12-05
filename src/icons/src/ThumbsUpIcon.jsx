import React from "react";
import { createIcon } from "./helpers/icon";

export const ThumbsUpIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" {...props}>
            <path
                d="M5.208 14.25H3.792A.792.792 0 013 13.458V7.917c0-.437.355-.792.792-.792h1.416c.437 0 .792.355.792.792v5.541a.792.792 0 01-.792.792v0zM6 7.929l2.737-3.563a1.3 1.3 0 012.035-.035c.199.24.307.544.307.856V7.64h2.322c.45 0 .872.225 1.122.6l.247.368c.221.33.286.742.175 1.124l-1.019 3.541a1.35 1.35 0 01-1.297.977H7.913a1.35 1.35 0 01-.989-.43L6 12.824"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

ThumbsUpIcon.tags = ["feedback", "thumb", "up", "like"];
