import { PopoverList } from "@xola/ui-kit";
import React from "react";

interface ActionsMenuProps {
    isVisible: boolean;
    zIndex?: number;
    onHide: () => void;
}

export const ActionsMenu = ({ isVisible, onHide, ...rest }: ActionsMenuProps) => (
    <PopoverList visible={isVisible} onClickOutside={onHide} {...rest}>
        <span>Actions</span>
    </PopoverList>
);

export const Toolbar = ({ isVisible, onHide }: Pick<ActionsMenuProps, "isVisible" | "onHide">) => (
    <ActionsMenu isVisible={isVisible} zIndex={30} onHide={onHide} />
);
