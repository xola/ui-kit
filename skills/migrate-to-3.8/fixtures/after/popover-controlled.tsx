import { Popover } from "@xola/ui-kit";
import React, { useState } from "react";

export const ControlledPopover = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleHide = () => setIsVisible(false);
    const handleShow = () => setIsVisible(true);

    return (
        <Popover open={isVisible} onClickOutside={handleHide}>
            <button type="button" onClick={handleShow}>
                Open
            </button>
            <Popover.Content>Controlled</Popover.Content>
        </Popover>
    );
};
