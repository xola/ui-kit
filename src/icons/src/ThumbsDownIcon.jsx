import React from "react";
import { createIcon } from "./helpers/icon";

export const ThumbsDownIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" {...props}>
            <path
                d="M12.79 3.857h1.416c.437 0 .792.355.792.792v5.541a.792.792 0 01-.792.792H12.79a.792.792 0 01-.792-.792V4.65c0-.438.355-.793.792-.793v0z"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.998 10.178l-2.737 3.563a1.3 1.3 0 01-2.035.035 1.344 1.344 0 01-.307-.856v-2.453H4.597a1.35 1.35 0 01-1.122-.6L3.228 9.5a1.35 1.35 0 01-.175-1.124l1.019-3.541a1.35 1.35 0 011.297-.977h4.716c.375 0 .734.156.989.43l.924.995"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

ThumbsDownIcon.tags = ["feedback", "thumb", "down", "dislike"];
