import React from "react";
import { createIcon } from "../helpers/icon";

export const RulerIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M9.593 1.313L2.479 8.427c-.173.172-.125.5.106.731l2.423 2.423c.231.231.559.279.732.106l7.114-7.114c.172-.172.125-.5-.107-.731l-2.422-2.423c-.232-.231-.56-.279-.732-.106zM4.708 6.774L6.19 8.256M5.9 5.588l1.037 1.038M7.221 4.26l1.482 1.482M8.407 3.075l1.191 1.18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
