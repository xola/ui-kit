import React from "react";
import { createIcon } from "./helpers/icon";

export const WarningFilledIcon = createIcon((props) => {
    return (
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M16.3019 9.3168C16.3086 13.4083 13.0274 16.7498 8.92917 16.8034H8.92247C4.91131 16.857 1.61667 13.6628 1.5564 9.65162C1.54971 9.61814 1.54971 9.58466 1.54971 9.55787L1.54301 9.55117C1.52962 5.45229 4.81087 2.11077 8.90908 2.0505V2.04381C12.9135 1.98354 16.2082 5.17774 16.2685 9.1889C16.2685 9.21568 16.2685 9.24917 16.2685 9.27595L16.3019 9.3168Z"
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M8.93555 10.1429V6.10181" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M8.93011 12.1254V12.1247C8.83636 12.1247 8.7627 12.1984 8.7627 12.2854C8.7627 12.3725 8.83636 12.4462 8.93011 12.4462V12.4455C9.01716 12.4388 9.09082 12.3651 9.09082 12.2714C9.08412 12.2647 9.08412 12.2647 9.08412 12.2647L9.07743 12.258C9.07073 12.1642 8.99707 12.0906 8.91002 12.0906H8.90332"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

WarningFilledIcon.tags = ["exclamation", "filled"];
