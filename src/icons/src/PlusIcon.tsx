import React from "react";
import { createIcon } from "./helpers/icon";

export const PlusIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" {...props}>
            <path d="M7 2v10M12 7H2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});

PlusIcon.tags = ["add"];
