import React from "react";
import { createIcon } from "../helpers/icon";

export const BankCheckIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M9.483 1.308a1.051 1.051 0 111.488 1.488L6.22 7.543a.613.613 0 01-.433.18H4.557V6.49a.61.61 0 01.179-.432l4.747-4.75zM8.833 7.722h1.222M3.945 10.167h6.111"
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.278 5.89c.675 0 1.222.546 1.222 1.222v4.277c0 .676-.547 1.223-1.222 1.223H2.722A1.222 1.222 0 011.5 11.389V7.112c0-.676.547-1.223 1.222-1.223M8.265 2.528L9.75 4.014"
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

BankCheckIcon.tags = ["cheque", "payment method"];
