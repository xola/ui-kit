import React from "react";
import { createIcon } from "./helpers/icon";

export const VariantIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 24 24" width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_14983_75622)" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6.5 21C5.57174 21 4.6815 20.6313 4.02513 19.9749C3.36875 19.3185 3 18.4283 3 17.5V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H8C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5V17.5C10 18.4283 9.63125 19.3185 8.97487 19.9749C8.3185 20.6313 7.42826 21 6.5 21Z" />
                <path d="M8.97461 19.9751L18.6856 10.2641C19.0606 9.88901 19.2712 9.38039 19.2712 8.85007C19.2712 8.31974 19.0606 7.81112 18.6856 7.43607L16.5646 5.31507C16.1896 4.94012 15.6809 4.72949 15.1506 4.72949C14.6203 4.72949 14.1117 4.94012 13.7366 5.31507L9.99961 9.05007" />
                <path d="M14.95 14H19C19.5304 14 20.0391 14.2107 20.4142 14.5858C20.7893 14.9609 21 15.4696 21 16V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H6.5" />
                <path d="M3 14.957H10" />
                <path d="M3 8.91406H10" />
            </g>
            <defs>
                <clipPath id="clip0_14983_75622">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
});

VariantIcon.tags = ["merchandise", "variant", "inventory"];
