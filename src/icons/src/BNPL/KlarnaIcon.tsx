import React from "react";
import { createIcon } from "../helpers/icon";

export const KlarnaIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <rect width="24" height="24" rx="12" fill="#FFA8CD" />
            <path
                d="M17.5912 4.51457H14.3407C14.3407 7.18795 12.706 9.58293 10.2202 11.2939L9.24309 11.978V4.51453H5.86669V19.4852H9.24309V12.0644L14.83 19.4853H18.9506L13.5761 12.3852C16.0194 10.6098 17.6132 7.85151 17.5912 4.51457Z"
                fill="#0B051D"
            />
        </svg>
    );
});

KlarnaIcon.tags = ["payment", "klarna", "bnpl"];
