import React from "react";
import { createIcon } from "../helpers/icon";

export const FlexFee2Icon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.245.869a1 1 0 011.51 0l.933 1.074a1 1 0 00.912.332l1.406-.223a1 1 0 011.156.97l.025 1.423a1 1 0 00.485.84l1.22.733a1 1 0 01.262 1.487l-.896 1.106a1 1 0 00-.168.955l.463 1.346a1 1 0 01-.755 1.307l-1.397.272a1 1 0 00-.743.623l-.51 1.329a1 1 0 01-1.418.516l-1.245-.69a1 1 0 00-.97 0l-1.245.69a1 1 0 01-1.418-.516l-.51-1.329a1 1 0 00-.743-.623l-1.397-.272a1 1 0 01-.755-1.307l.463-1.346a1 1 0 00-.168-.955L.846 7.505a1 1 0 01.262-1.487l1.22-.732a1 1 0 00.485-.84l.025-1.424a1 1 0 011.156-.97l1.406.223a1 1 0 00.912-.332L7.245.87z"
                fill="#8A8C91"
            />
            <circle cx={9.965} cy={8.048} r={1.717} fill="#fff" stroke="#fff" strokeWidth={1.529} />
            <path
                d="M6.187 8.048c0 .617.149 1.2.412 1.715a1.717 1.717 0 010-3.431 3.762 3.762 0 00-.412 1.716z"
                fill="#fff"
                stroke="#fff"
                strokeWidth={1.529}
            />
        </svg>
    );
});

FlexFee2Icon.tags = ["flex", "fee", "partnerfee", "partner"];
