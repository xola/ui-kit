import React from "react";
import { createIcon } from "./helpers/icon";

export const ProductsIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12.25 4.083H1.75a.584.584 0 01-.583-.583V2.333c0-.322.261-.583.583-.583h10.5c.322 0 .584.261.584.583V3.5a.584.584 0 01-.584.583zM12.056 4.083v7c0 .645-.522 1.167-1.167 1.167H3.111a1.166 1.166 0 01-1.167-1.167v-7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

ProductsIcon.tags = ["experience", "listing"];
