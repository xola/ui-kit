import React from "react";
import { createIcon } from "./helpers/icon";

export const EditNotesIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M11.42 6.753a1.063 1.063 0 111.503 1.504L9.356 11.82a.617.617 0 01-.436.18H7.676v-1.245c0-.163.065-.32.18-.436l3.564-3.566v0zM3.97 4.588h4.942M3.97 7.059H7.06M12.136 9.048L10.629 7.54M11.382 4.588V2.735c0-.682-.553-1.235-1.235-1.235H2.735c-.682 0-1.235.553-1.235 1.235v8.03c0 .682.553 1.235 1.235 1.235h2.47"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
