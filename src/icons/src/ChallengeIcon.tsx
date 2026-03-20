import React from "react";
import { createIcon } from "./helpers/icon";

export const ChallengeIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 12 12" width={12} height={12} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.44164 0.723689C6.30969 0.174463 8.4124 0.635968 9.88679 2.11036C12.0349 4.25844 12.0344 7.7409 9.88679 9.88854C7.73915 12.0362 4.25669 12.0366 2.10862 9.88854C1.07511 8.85503 0.538955 7.51263 0.500012 6.15861"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

ChallengeIcon.tags = ["challenge"];
