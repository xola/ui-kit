import React from "react";
import { createIcon } from "../helpers/icon";

export const ProductsIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 15 13" width={15} height={13} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M14.4384 3.33711C14.4384 3.6598 14.1768 3.92139 13.8541 3.92139H1.58428V3.92139C1.26159 3.92139 1 3.6598 1 3.33711V1.58428V1.58428C1 1.26159 1.26159 1 1.58428 1H13.8541V1C14.1768 1 14.4384 1.26159 14.4384 1.58428V3.33711Z"
                stroke="currentcolor"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M13.8538 4.22095V10.9328C13.8538 11.2555 13.5922 11.5171 13.2695 11.5171H2.16826C1.84557 11.5171 1.58398 11.2555 1.58398 10.9328V4.22095"
                stroke="currentcolor"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
});
