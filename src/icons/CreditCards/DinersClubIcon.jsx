import React from "react";
import { createIcon } from "../../helpers/icon";

export const DinersClubIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" fill="none" viewBox="0 0 34 24" {...props}>
            <rect width="33" height="23" x="0.5" y="0.5" fill="#fff" stroke="#D9D9D9" rx="3.5" />
            <path
                fill="#0079BE"
                fillRule="evenodd"
                d="M15.839 19.3h2.596c4.052 0 7.282-3.215 7.408-7.187v-.063c-.063-4.034-3.356-7.312-7.408-7.25h-2.913c-3.862.127-6.902 3.405-6.775 7.314 0 3.908 3.166 7.123 7.092 7.186zm-5.826-7.25c0-3.278 2.723-5.988 6.016-5.988 3.292 0 6.015 2.71 6.015 5.988 0 3.278-2.723 5.99-6.015 5.99-3.293 0-6.016-2.711-6.016-5.99zm6.966 4.035V8.079c2.216.567 3.609 2.774 3.039 4.98a4.114 4.114 0 01-3.04 3.026zm-4.876-5.043a4.142 4.142 0 002.976 5.043V8.079a4.155 4.155 0 00-2.976 2.963z"
                clipRule="evenodd"
            />
        </svg>
    );
});

DinersClubIcon.tags = ["cc", "credit card"];