import React from "react";
import { createIcon } from "./helpers/icon";

export const ScanQrCodeIcon = createIcon((props) => {
    return (
        <svg width={21} height={21} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.9}
                d="M6.518 6.145h2.593v2.592H6.518zM6.518 11.33h2.593v2.592H6.518zM14.296 8.737h-2.592V6.145h2.592z"
            />
            <path
                fill="currentColor"
                d="M13.342 12.282a.486.486 0 1 1-.688.687.486.486 0 0 1 .688-.687M12.05 10.986a.486.486 0 1 1-.688.688.486.486 0 0 1 .687-.688M12.05 13.578a.486.486 0 1 1-.688.688.486.486 0 0 1 .687-.688M14.64 13.578a.486.486 0 1 1-.688.688.486.486 0 0 1 .688-.688"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.1}
                d="M16.563 7.426V5.172c0-.716-.58-1.297-1.297-1.297h-2.254M7.798 3.875H5.544c-.716 0-1.296.58-1.296 1.297v2.254M4.248 12.64v2.255c0 .716.58 1.296 1.296 1.296h2.254M13.012 16.191h2.254c.716 0 1.297-.58 1.297-1.296V12.64"
            />
            <path fill="currentColor" d="M14.64 10.986a.486.486 0 1 1-.688.687.486.486 0 0 1 .688-.687" />
        </svg>
    );
});
