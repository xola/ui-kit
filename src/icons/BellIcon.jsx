import React from "react";
import { createIcon } from "../helpers/icon";

export const BellIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.329 10.7v.214a1.337 1.337 0 002.674-.001V10.7M8.735 3.355v-.536a1.07 1.07 0 10-2.138 0v.536"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.494 5.943A2.643 2.643 0 017.138 3.3h1.057a2.643 2.643 0 012.643 2.643v1.632c0 .309.123.606.342.824l.374.374c.219.22.342.516.342.825 0 .61-.494 1.103-1.103 1.103H4.54a1.102 1.102 0 01-1.102-1.103c0-.309.123-.606.342-.825l.374-.374c.218-.218.341-.515.341-.824V5.943v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
