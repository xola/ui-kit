import React from "react";
import { createIcon } from "../helpers/icon";

export const CircleCrownIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M14.368 3.633c2.958 2.958 2.958 7.776 0 10.734s-7.776 2.958-10.734 0C.675 11.41.675 6.591 3.634 3.633c2.958-2.958 7.691-2.958 10.734 0z"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.762 11.578H5.155c-.254 0-.423-.169-.423-.422V7.352c0-.338.423-.591.677-.338l1.69 1.352L8.62 6.761a.409.409 0 01.592 0l1.521 1.605 1.69-1.352c.254-.253.677 0 .677.338v3.804c.085.253-.085.422-.338.422z"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
