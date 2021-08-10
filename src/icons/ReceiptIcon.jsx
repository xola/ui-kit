import React from "react";
import { createIcon } from "../helpers/icon";

export const ReceiptIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.858 11.344c0 .15-.128.279-.279.279a.283.283 0 01-.184-.073l-1.494-1.283-2.064 1.545v-.005a.285.285 0 01-.334 0l-2.064-1.55-1.494 1.277v-.006a.287.287 0 01-.469-.218V2.063a.552.552 0 01.552-.563h7.25-.005a.551.551 0 01.557.552l.028 9.292zM4.931 4.236h2.736M4.931 6.06h4.56M4.931 7.884h4.56"
                stroke="currentColor"
                strokeWidth={0.912}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
