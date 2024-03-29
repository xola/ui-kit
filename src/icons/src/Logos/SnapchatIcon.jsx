import React from "react";
import { createIcon } from "../helpers/icon";

export const SnapchatIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M5.529 4.406c-.338.756-.204 2.11-.15 3.058-.365.202-.833-.153-1.098-.153-.276 0-.605.182-.656.452-.037.194.05.478.675.725.242.095.818.208.95.522.188.44-.961 2.476-2.766 2.773a.28.28 0 00-.234.292c.032.549 1.262.764 1.807.848.055.075.1.394.172.636a.313.313 0 00.327.239c.277 0 .738-.214 1.54-.081.787.13 1.526 1.246 2.945 1.246 1.32 0 2.106-1.12 2.863-1.246a3.31 3.31 0 011.236.032c.29.057.55.089.632-.196.072-.246.117-.558.171-.632.54-.083 1.776-.298 1.807-.846a.28.28 0 00-.234-.292c-1.775-.293-2.959-2.322-2.767-2.774.133-.313.704-.425.95-.522.459-.18.688-.403.683-.66-.006-.329-.402-.525-.694-.525-.296 0-.722.35-1.067.16.054-.954.187-2.303-.15-3.058-.638-1.43-2.059-2.154-3.478-2.154-1.411 0-2.82.713-3.464 2.156z"
                fill="#000"
            />
        </svg>
    );
});

SnapchatIcon.tags = ["logo", "social media"];
