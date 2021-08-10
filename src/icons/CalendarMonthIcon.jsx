import React from "react";
import { createIcon } from "../helpers/icon";

export const CalendarMonthIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12.426 2.87h-9.52a.24.24 0 00-.24.24v8.65c0 .133.108.24.24.24h9.52a.24.24 0 00.24-.24V3.11a.24.24 0 00-.24-.24z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.645 7.104c.002-.587-.512-1.022-1.228-1.022-.705 0-1.275.42-1.285 1.058l-.002.101h.862l.003-.096c.005-.176.167-.314.42-.314.119 0 .21.036.27.09a.29.29 0 01.094.224v.002c0 .097-.04.176-.11.233a.509.509 0 01-.322.098h-.405v.708h.405c.17 0 .297.042.38.105.08.06.121.144.12.243v.001c.001.1-.04.18-.112.24a.513.513 0 01-.326.1c-.278 0-.438-.142-.446-.306l-.005-.094H5.064l.002.102c.013.646.59 1.068 1.342 1.068.763 0 1.36-.426 1.359-1.064a.814.814 0 00-.216-.578.863.863 0 00-.315-.207.758.758 0 00.41-.692zm0 0s0 0 0 0h-.1.1s0 0 0 0zm2.643-.877v-.1h-.78l-.024.016-.81.513-.046.03V7.533l.153-.095.615-.386V9.6H10.288V6.227z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={0.2}
            />
            <path d="M4.84 2v2.174M10.492 2v2.174" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});
