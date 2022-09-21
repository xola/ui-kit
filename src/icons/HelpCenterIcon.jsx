import React from "react";
import { createIcon } from "../helpers/icon";

export const HelpCenterIcon = createIcon((props) => {
    return (
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M6.25 11.25C9.1495 11.25 11.5 8.8995 11.5 6C11.5 3.1005 9.1495 0.75 6.25 0.75C3.3505 0.75 1 3.1005 1 6C1 8.8995 3.3505 11.25 6.25 11.25Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.24772 8.04195C7.3753 8.04195 8.28939 7.12787 8.28939 6.00028C8.28939 4.8727 7.3753 3.95862 6.24772 3.95862C5.12014 3.95862 4.20605 4.8727 4.20605 6.00028C4.20605 7.12787 5.12014 8.04195 6.24772 8.04195Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.69238 4.55626L9.96055 2.28809" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.54004 9.71156L4.80811 7.44348" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.80821 4.55626L2.54004 2.28809" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.96046 9.71156L7.69238 7.44348" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
});

HelpCenterIcon.tags = ["help", "center"];
