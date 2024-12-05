import clsx from "clsx";
import React from "react";

export const TutorialsButtonIcon = (props) => {
    const className = clsx("relative -top-0.25 inline-block", props.className);
    return (
        <svg
            viewBox="0 0 32 30"
            width="32"
            height="30"
            fill="none"

            {...props}
            className={className}
        >
            <rect width="32" height="30" fill="url(#paint0_linear_3440_197284)" rx="4" />
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.444 15.105s-.364 3.346-.364 3.437c2.367 0 5.007 2.458 5.007 2.458s2.184-2.458 5.28-2.458c.043-.058-.364-3.437-.364-3.437"
            />
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.142 10l-8.69 3.578 8.69 3.18 8.69-3.18L16.142 10zM24.8 13.682v4.856"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_3440_197284"
                    x1="-2.353"
                    x2="32.456"
                    y1="6.5"
                    y2="31.494"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#583DFF" />
                    <stop offset="0.79" stopColor="#F849C7" />
                    <stop offset="1" stopColor="#FFC03D" />
                </linearGradient>
            </defs>
        </svg>
    );
};

TutorialsButtonIcon.tags = ["tutorial", "cards", "fixed-size"];
