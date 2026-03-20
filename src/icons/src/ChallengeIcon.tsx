import React from "react";
import { createIcon } from "./helpers/icon";

export const ChallengeIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 15" width={14} height={15} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.97058 5.63489H6.72321C6.53205 5.63502 6.34688 5.70167 6.19948 5.82339C6.05208 5.94512 5.95163 6.11434 5.91535 6.30203C5.87908 6.48973 5.90924 6.68419 6.00067 6.85208C6.09209 7.01996 6.23909 7.15081 6.41643 7.22216L7.68282 7.72835C7.86056 7.79945 8.00798 7.93027 8.09971 8.0983C8.19144 8.26633 8.22175 8.46107 8.18544 8.64903C8.14913 8.837 8.04845 9.00643 7.90073 9.1282C7.75301 9.24997 7.56748 9.31646 7.37604 9.31624H6.1299"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M7.05078 5.63485V5.17468" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.05078 9.77645V9.31628" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M6.52136 0.499997L5.27123 1.75012L6.52136 3.00025L5.27123 1.75012"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.49584 1.97436C7.36389 1.42513 9.46659 1.88664 10.941 3.36104C13.0891 5.50911 13.0886 8.99157 10.941 11.1392C8.79335 13.2869 5.31089 13.2873 3.16282 11.1392C2.12931 10.1057 1.59315 8.7633 1.55421 7.40929"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

ChallengeIcon.tags = ["challenge"];
