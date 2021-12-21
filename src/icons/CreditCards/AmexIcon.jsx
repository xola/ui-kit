import React from "react";
import { createIcon } from "../../helpers/icon";

export const AmexIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" fill="none" viewBox="0 0 34 24" {...props}>
            <rect width="34" height="24" fill="#1F72CD" rx="4"></rect>
            <path
                fill="#fff"
                fillRule="evenodd"
                d="M6.095 8.5l-3.18 7.247h3.807l.472-1.156h1.08l.472 1.156h4.191v-.882l.374.882h2.168l.374-.9v.9h8.718l1.06-1.126.992 1.126 4.478.01-3.191-3.613L31.1 8.5h-4.407L25.66 9.605 24.699 8.5h-9.483l-.815 1.87-.833-1.87h-3.8v.852L9.345 8.5h-3.25zm.737 1.029h1.856l2.11 4.914V9.53h2.034l1.63 3.523 1.502-3.523h2.023v5.2h-1.231l-.01-4.075-1.795 4.075H13.85l-1.805-4.075v4.075H9.512l-.48-1.166H6.437l-.479 1.165H4.601l2.231-5.199zm17.288 0h-5.007v5.197h4.93l1.588-1.722 1.53 1.722h1.601l-2.326-2.583 2.326-2.614h-1.53l-1.581 1.703-1.531-1.703zm-16.385.88l-.855 2.077H8.59l-.854-2.077zm12.615 1.146v-.95h3.123l1.363 1.518-1.423 1.526H20.35v-1.036h2.73v-1.058h-2.73z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
});
