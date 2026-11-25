import { Popover } from "@xola/ui-kit";
import React, { useState } from "react";

export const ControlledPopover = () => {
    const [isVisible, setIsVisible] = useState<boolean>();

    const handleHide = () => setIsVisible(false);
    const handleShow = () => setIsVisible(true);

    return (
        <Popover visible={isVisible} onClickOutside={handleHide}>
            <button type="button" onClick={handleShow}>
                Open
            </button>
            <Popover.Content>Controlled</Popover.Content>
        </Popover>
    );
};
