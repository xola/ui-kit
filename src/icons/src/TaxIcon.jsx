import React from "react";
import { createIcon } from "./helpers/icon";

export const TaxIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" {...props}>
            <path
                d="M5.786 15.52h-2.5c-.2 0-.413-.034-.542-.187a.751.751 0 01-.173-.477V3.686a.744.744 0 01.41-.665l.737-.37a.744.744 0 01.665-.002l1.17.579L6.7 2.652a.744.744 0 01.666-.002l1.16.578 1.16-.578a.744.744 0 01.666.002l1.147.576 1.17-.58a.744.744 0 01.665.003l.737.37a.745.745 0 01.41.665v1.897"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.97 11.944a4.77 4.77 0 11-4.77-4.771 4.764 4.764 0 014.77 4.77v0z"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.645 10.456a.047.047 0 01-.014-.034.048.048 0 01.03-.044.048.048 0 01.062.026.047.047 0 01-.044.066.049.049 0 01-.034-.014M10.007 13.136l2.385-2.385M12.646 13.552a.048.048 0 11.082-.034.048.048 0 01-.014.034.049.049 0 01-.068 0"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

TaxIcon.tags = ["tax", "money", "finance", "fees"];
