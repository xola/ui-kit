import React from "react";
import { renderIcon } from "../helpers/icon";

export const UserIcon = (props) =>
    renderIcon(
        props,
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#UserIcon_svg__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.02 2.591h0a5.371 5.371 0 005.988 1.204" />
                <path d="M6.805 7.465a3.233 3.233 0 100-6.465 3.233 3.233 0 000 6.465zM11.61 11.649a5.315 5.315 0 00-9.61 0" />
            </g>
            <defs>
                <clipPath id="UserIcon_svg__clip0">
                    <path fill="#fff" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>,
    );
