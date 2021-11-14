import React from "react";
import { createIcon } from "../helpers/icon";

export const HiddenIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.609 11.667l9.722-9.334M5.814 10.656c.51.158 1.04.237 1.574.233 2.126.036 4.282-1.459 5.613-2.923a.862.862 0 000-1.154 10.665 10.665 0 00-1.594-1.43M8.64 4.035c-.41-.102-.83-.15-1.252-.146-2.09-.035-4.252 1.427-5.61 2.922a.862.862 0 000 1.154c.412.452.863.869 1.347 1.244M5.444 7.389a1.944 1.944 0 011.944-1.945M9.333 7.388a1.945 1.945 0 01-1.945 1.945"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
