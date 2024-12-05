import React from "react";
import { createIcon } from "./helpers/icon";

export const BarGraphIcon = createIcon((props) => {
    return (
        <svg width="14" height="14" fill="none" viewBox="0 0 14 14" {...props}>
            <path
                clipRule="evenodd"
                d="M2.88 6.511H1.376h0A.376.376 0 001 6.887v4.888h2.256V6.887v0a.376.376 0 00-.376-.376v0zM7.752 2H6.248h0a.376.376 0 00-.376.376v9.399h2.256V2.376v0A.376.376 0 007.752 2v0zM12.624 4.256H11.12h0a.376.376 0 00-.376.376v7.143H13V4.632v0a.376.376 0 00-.376-.376v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

BarGraphIcon.tags = ["stats", "reports", "analytics"];
