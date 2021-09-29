import React from "react";
import { createIcon } from "../helpers/icon";

export const XrayIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 15 18" width={15} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M5.8252 16.3H9.51383" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7.66895 16.5V17.2377" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M5.82474 13.9424C5.82474 14.1416 5.98704 14.3039 6.1936 14.3039H9.14451H9.13713C9.33632 14.3039 9.50599 14.1342 9.50599 13.935V13.3153V13.3079C12.2798 12.6071 14.2422 10.1431 14.2938 7.2807L14.2865 7.27332C14.1758 3.70272 11.2101 0.899361 7.63955 1.00264C4.06895 0.899361 1.10328 3.70272 1 7.26595C1.05164 10.121 3.014 12.585 5.79523 13.2858L5.82474 13.9424Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
});
