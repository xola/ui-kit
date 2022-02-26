import React from "react";
import { createIcon } from "../helpers/icon";

export const ReceptionBellMoneyIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14" {...props}>
            <path
                d="M6.38 3.5v2.714M5.401 3.5h1.957M1.679 11.642a.68.68 0 01-.672-.774 5.428 5.428 0 0110.745 0 .68.68 0 01-.671.775l-9.402-.001zM10.906 1.925V1.3M11.843 1.925h-1.275a.839.839 0 00-.843.838.84.84 0 00.525.775l1.29.512-.007-.006a.834.834 0 01.463 1.087.852.852 0 01-.781.525H9.937M10.906 6.3v-.625"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

ReceptionBellMoneyIcon.tags = ["partner", "affiliate", "money"];
