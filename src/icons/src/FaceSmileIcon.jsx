import React from "react";
import { createIcon } from "./helpers/icon";

export const FaceSmileIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M4.077 5.843h-.005c.067-.005.128.058.128.126s-.061.13-.128.13c-.072 0-.128-.062-.133-.13a.129.129 0 01.123-.136M9.722 5.843h-.005a.128.128 0 00-.128.13c0 .069.056.132.128.127.067-.006.128-.063.123-.137a.132.132 0 00-.128-.13M3.822 8.853l-.006-.005c.708 1.733 2.658 2.555 4.361 1.833a3.38 3.38 0 001.796-1.833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.9 1c-.775 0-1.542.156-2.258.458a5.894 5.894 0 00-1.914 1.306A6.03 6.03 0 001.45 4.717a6.129 6.129 0 000 4.608 6.03 6.03 0 001.28 1.954 5.892 5.892 0 001.913 1.305 5.797 5.797 0 004.516 0 5.892 5.892 0 001.914-1.306 6.03 6.03 0 001.279-1.953 6.128 6.128 0 000-4.608 6.03 6.03 0 00-1.28-1.953 5.893 5.893 0 00-1.913-1.306A5.797 5.797 0 006.9 1v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

FaceSmileIcon.tags = ["smiley", "emoji"];
