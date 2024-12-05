import React from "react";
import { createIcon } from "./helpers/icon";

export const CircleCheckFilledIcon = createIcon((props) => {
    return (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" {...props}>
            <path
                d="M9.49929 17.0859C13.6888 17.0859 17.085 13.6897 17.085 9.5002C17.085 5.31073 13.6888 1.91449 9.49929 1.91449C5.30981 1.91449 1.91357 5.31073 1.91357 9.5002C1.91357 13.6897 5.30981 17.0859 9.49929 17.0859Z"
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.3569 6.92865L8.05329 12.0715L5.64258 9.73384"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

CircleCheckFilledIcon.tags = ["tick", "correct", "filled"];
