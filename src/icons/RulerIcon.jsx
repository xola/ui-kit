import React from "react";
import { createIcon } from "../helpers/icon";

export const RulerIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.927 1.313L1.813 8.427c-.173.172-.125.5.106.731l2.423 2.423c.231.231.559.279.731.106l7.114-7.114c.173-.172.125-.5-.106-.731L9.658 1.419c-.231-.231-.559-.279-.731-.106zM4.042 6.774l1.482 1.482M5.233 5.588l1.038 1.038M6.556 4.26l1.482 1.482M7.741 3.075l1.192 1.18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

RulerIcon.tags = ["measure", "scale"];
