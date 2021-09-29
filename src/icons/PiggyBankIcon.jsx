import React from "react";
import { createIcon } from "../helpers/icon";

export const PiggyBankIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" fill="none" viewBox="0 0 19 17" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.716 12.18a5.437 5.437 0 002.22-4.263c0-3.233-3.146-5.857-7.03-5.857-.766 0-1.529.106-2.266.317a3.764 3.764 0 00-1.766-1.35.488.488 0 00-.647.458v2.089a5.271 5.271 0 00-1.763 2.303h-.976A.488.488 0 001 6.365v2.929c0 .27.219.488.488.488h.976a5.816 5.816 0 001.97 2.623l-.61 1.66a1.171 1.171 0 102.196.81l.534-1.449a8.248 8.248 0 005.076-.11l.575 1.562a1.171 1.171 0 102.198-.81l-.688-1.888z"
                clipRule="evenodd"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.935 7.917c1.562 0 2.343-.781 2.343-1.953M5.64 6.365v0a.244.244 0 11-.244.244v0c0-.134.11-.244.244-.244"
            />
        </svg>
    );
});
