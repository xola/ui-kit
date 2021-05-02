import React from "react";
import clsx from "clsx";

const colors = {
    primary: "text-primary",
    secondary: "text-secondary",
    warning: "text-warning",
    success: "text-success",
    danger: "text-danger",
    standard: "text-gray-dark",
};

const sizes = {
    xsmall: "w-5 h-5",
    small: "w-7 h-7",
    medium: "w-10 h-10",
    large: "w-14 h-14",
};

export const Spinner = ({ className, size = "small", color = "standard" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={clsx("spinner m-auto", className, sizes[size], "inline")}
            display="block"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 100 100"
        >
            <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                className={clsx("stroke-current stroke-[8px]", colors[color])}
                strokeDasharray="164.93361431346415 56.97787143782138"
            >
                <animateTransform
                    attributeName="transform"
                    dur="1s"
                    keyTimes="0;1"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 50 50;360 50 50"
                ></animateTransform>
            </circle>
        </svg>
    );
};
