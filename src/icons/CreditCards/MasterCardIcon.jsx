import React from "react";
import { createIcon } from "../../helpers/icon";

export const MasterCardIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" fill="none" viewBox="0 0 34 24" {...props}>
            <rect width="33" height="23" x="0.5" y="0.5" fill="#fff" stroke="#D9D9D9" rx="3.5" />
            <path
                fill="#ED0006"
                fillRule="evenodd"
                d="M17.179 16.83a6.803 6.803 0 01-4.398 1.6c-3.745 0-6.781-3-6.781-6.7s3.036-6.7 6.78-6.7c1.679 0 3.215.603 4.399 1.6a6.802 6.802 0 014.398-1.6c3.745 0 6.781 3 6.781 6.7s-3.036 6.7-6.78 6.7a6.802 6.802 0 01-4.399-1.6z"
                clipRule="evenodd"
            />
            <path
                fill="#F9A000"
                fillRule="evenodd"
                d="M17.179 16.83a6.653 6.653 0 002.382-5.1c0-2.042-.924-3.87-2.382-5.1a6.802 6.802 0 014.398-1.6c3.745 0 6.78 3 6.78 6.7s-3.035 6.7-6.78 6.7a6.803 6.803 0 01-4.398-1.6z"
                clipRule="evenodd"
            />
            <path
                fill="#FF5E00"
                fillRule="evenodd"
                d="M17.18 16.83a6.653 6.653 0 002.382-5.1c0-2.042-.925-3.87-2.383-5.1a6.653 6.653 0 00-2.382 5.1c0 2.042.924 3.87 2.382 5.1z"
                clipRule="evenodd"
            />
        </svg>
    );
});

MasterCardIcon.tags = ["cc", "credit card"];
