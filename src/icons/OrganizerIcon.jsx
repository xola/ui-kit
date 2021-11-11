import React from "react";
import { createIcon } from "../helpers/icon";

export const OrganizerIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M1.035 9.171c0 .456.39.828.887.828h10.192c.487 0 .886-.372.886-.828v-4.47a.439.439 0 00-.452-.414.443.443 0 00-.293.1L9.438 6.68 7.115 4.147a.47.47 0 00-.629-.05c-.018.008-.035.025-.053.041L4.11 6.663 1.762 4.469v0a.47.47 0 00-.63-.009.377.377 0 00-.132.29l.035 4.421z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
