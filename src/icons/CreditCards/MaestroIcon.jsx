import React from "react";
import { createIcon } from "../../helpers/icon";

export const MaestroIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" fill="none" viewBox="0 0 34 24" {...props}>
            <rect width="33" height="23" x="0.5" y="0.5" fill="#fff" stroke="#D9D9D9" rx="3.5"></rect>
            <path
                fill="#ED0006"
                d="M19.258 11.706c0 3.703-2.968 6.706-6.63 6.706-3.66 0-6.628-3.003-6.628-6.706C6 8.002 8.968 5 12.629 5c3.66 0 6.629 3.002 6.629 6.706z"
            ></path>
            <path
                fill="#0099DF"
                d="M27.857 11.706c0 3.703-2.968 6.706-6.629 6.706-3.66 0-6.628-3.003-6.628-6.706C14.6 8.002 17.567 5 21.228 5s6.63 3.002 6.63 6.706z"
            ></path>
            <path
                fill="#6C6BBD"
                fillRule="evenodd"
                d="M16.929 6.602a6.723 6.723 0 012.329 5.104 6.723 6.723 0 01-2.33 5.104 6.723 6.723 0 01-2.328-5.104c0-2.044.903-3.874 2.329-5.104z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
});
