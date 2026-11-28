import { PopoverList } from "@xola/ui-kit";
import React from "react";

interface ActionsMenuProps {
    isVisible: boolean;
    onHide: () => void;
}

export const ActionsMenu = ({ isVisible, onHide, ...rest }: ActionsMenuProps) => (
    <PopoverList open={isVisible} onClickOutside={onHide} {...rest}>
        <span>Actions</span>
    </PopoverList>
);

export const Toolbar = ({ isVisible, onHide }: Pick<ActionsMenuProps, "isVisible" | "onHide">) => (
    <ActionsMenu isVisible={isVisible} onHide={onHide} />
);
