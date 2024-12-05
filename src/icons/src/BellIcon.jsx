import React from "react";
import { createIcon } from "./helpers/icon";

export const BellIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M5.663 10.7v.214a1.337 1.337 0 002.674 0V10.7M8.07 3.355v-.536a1.07 1.07 0 10-2.14 0v.536"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.828 5.943A2.643 2.643 0 016.471 3.3H7.53a2.643 2.643 0 012.643 2.643v1.631c0 .31.123.607.342.825l.374.374c.218.219.341.516.341.825 0 .61-.493 1.103-1.102 1.103H3.873a1.102 1.102 0 01-1.102-1.103c0-.31.123-.606.341-.825l.374-.374c.219-.218.342-.515.342-.825V5.943v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

BellIcon.tags = ["notification", "pending"];
