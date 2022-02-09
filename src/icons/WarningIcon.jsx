import React from "react";
import { createIcon } from "../helpers/icon";

export const WarningIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12.798 6.815a5.972 5.972 0 01-5.893 5.984h-.006a5.805 5.805 0 01-5.888-5.717c-.006-.026-.006-.053-.006-.075L1 7.002a5.974 5.974 0 015.888-5.996v-.005a5.795 5.795 0 015.883 5.711v.07l.027.033zM6.91 7.475v-3.23"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.905 9.06v0a.131.131 0 00-.134.128c0 .07.06.128.134.128v0a.14.14 0 00.129-.14l-.006-.005-.005-.005c-.005-.075-.064-.134-.134-.134h-.005"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
