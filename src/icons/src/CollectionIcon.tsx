import React, { type ComponentPropsWithoutRef } from "react";
import { createIcon } from "./helpers/icon";

export const CollectionIcon = createIcon((props: ComponentPropsWithoutRef<"svg">) => {
    return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_11341_315267)">
                <path
                    d="M9.92534 18.4718C9.75827 18.6391 9.55987 18.7719 9.34147 18.8625C9.12307 18.9532 8.88896 18.9999 8.6525 19C8.41604 19.0001 8.18188 18.9537 7.96338 18.8633C7.74489 18.7729 7.54635 18.6403 7.3791 18.4731L3.52754 14.6236C3.3603 14.4565 3.22763 14.258 3.13712 14.0396C3.0466 13.8211 3.00002 13.587 3.00002 13.3505C3.00002 13.1141 3.0466 12.8799 3.13712 12.6615C3.22763 12.443 3.3603 12.2446 3.52754 12.0774L10.0225 5.58541C10.3976 5.21055 10.9062 4.99999 11.4364 5H15C15.5304 5 16.0391 5.21071 16.4142 5.58579C16.7893 5.96086 17 6.46957 17 7V10.5585C17 11.0884 16.7897 11.5966 16.4153 11.9716L9.92534 18.4718Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M21 8V11.7974C21 12.3278 20.7893 12.8365 20.4142 13.2116L14.752 18.8738"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_11341_315267">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
});

CollectionIcon.tags = ["collection", "tags", "label", "organize"];
