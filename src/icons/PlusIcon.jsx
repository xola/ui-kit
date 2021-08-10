import React from "react";
import { createIcon } from "../helpers/icon";

export const PlusIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M7.666 2v10M12.666 7h-10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});
