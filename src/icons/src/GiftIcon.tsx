import React from "react";
import { createIcon } from "./helpers/icon";

export const GiftIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                clipRule="evenodd"
                d="M11.444 4.778H2.556A.556.556 0 002 5.333v1.111c0 .307.249.556.556.556h8.888A.556.556 0 0012 6.444v-1.11a.556.556 0 00-.556-.556z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 12V4.778M9.053 4.006c-.599.624-1.542.771-1.998.771M7.055 4.777s-.274-1.73.4-2.433M9.053 4.006a1.21 1.21 0 000-1.662 1.099 1.099 0 00-1.597 0M4.946 4.006c.6.624 1.542.771 1.999.771M6.944 4.777s.275-1.73-.4-2.433"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.947 4.006a1.21 1.21 0 010-1.662 1.099 1.099 0 011.597 0M10.89 7v4.444a.556.556 0 01-.556.556H3.667a.556.556 0 01-.556-.556V7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
