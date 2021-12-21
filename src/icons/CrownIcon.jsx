import React from "react";
import { createIcon } from "../helpers/icon";

export const CrownIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 15 15" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M1.701 10.147c0 .456.39.828.887.828H12.78c.487 0 .886-.372.886-.828v-4.47a.439.439 0 00-.452-.414.442.442 0 00-.292.1l-2.819 2.293-2.322-2.533a.47.47 0 00-.629-.05.232.232 0 00-.053.041L4.777 7.64 2.428 5.445v0a.47.47 0 00-.629-.009.377.377 0 00-.133.29l.035 4.421z"
            />
        </svg>
    );
});
