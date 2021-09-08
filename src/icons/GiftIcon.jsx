import React from "react";
import { createIcon } from "../helpers/icon";

export const GiftIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.611 6.988h-3.15l-.007-.001a.791.791 0 01-.788-.795v-.788a.78.78 0 01.78-.795h8.662-.008a.778.778 0 01.787.78v.787a.79.79 0 01-.787.787H8.95"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.974 6.988h2.756l-.347 4.78v-.008a.783.783 0 01-.787.724H4.973v0a.785.785 0 01-.787-.733l-.347-4.788h2.757M6.611 4.625V12.5M8.974 12.5V4.625M5.036 3.586c.473.472 2.757 1.031 2.757 1.031s-.56-2.283-1.04-2.756a1.22 1.22 0 00-1.724-.008A1.21 1.21 0 005.02 3.57l.015.016zM10.549 3.586c-.473.472-2.756 1.031-2.756 1.031s.55-2.283 1.031-2.756h-.008a1.21 1.21 0 011.717-.008 1.217 1.217 0 010 1.717l.016.016z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
