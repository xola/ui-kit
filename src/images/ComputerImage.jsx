import clsx from "clsx";
import React from "react";
import { createIcon } from "../helpers/icon";

export const ComputerImage = createIcon(({ className, ...rest }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="103"
            height="102"
            fill="none"
            viewBox="0 0 103 102"
            className={clsx("w-[103px] h-[102px]", className)}
            {...rest}
        >
            <circle cx="51.5" cy="51" r="51" fill="#F0F2F4" />
            <path
                fill="#222324"
                d="M42.424 65.769A2 2 0 0144.41 64h15.18a2 2 0 011.986 1.769l1.164 10A2 2 0 0160.754 78H43.246a2 2 0 01-1.986-2.231l1.164-10z"
            />
            <rect width="55.151" height="41.758" x="24" y="26" fill="#222324" rx="4" />
            <rect width="50.424" height="37.03" x="26.363" y="28.363" fill="#28A0E2" rx="3" />
        </svg>
    );
});
