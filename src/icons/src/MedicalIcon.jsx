import React from "react";
import { createIcon } from "./helpers/icon";

export const MedicalIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" {...props}>
            <path
                d="M14.657 6.429h-3.086V3.343c0-.78-.633-1.415-1.414-1.415H7.843c-.78 0-1.414.634-1.414 1.415v3.086H3.343c-.78 0-1.414.633-1.414 1.414v2.314c0 .78.633 1.414 1.414 1.414h3.086v3.086c0 .78.634 1.414 1.414 1.414h2.314c.78 0 1.414-.633 1.414-1.414v-3.086h3.086c.781 0 1.415-.633 1.415-1.414V7.843c0-.78-.634-1.414-1.415-1.414z"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

MedicalIcon.tags = ["health", "medical", "doctor", "nurse", "plus"];
