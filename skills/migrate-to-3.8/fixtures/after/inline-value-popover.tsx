import { InlineValuePopover } from "@xola/ui-kit";
import React from "react";

interface NameFieldProps {
    isOpen: boolean;
    name: string;
    onToggle: () => void;
}

export const NameField = ({ isOpen, name, onToggle }: NameFieldProps) => (
    <InlineValuePopover
        isOpen={isOpen}
        text={name}
        placement="bottom"
        distance={12}
        onClick={onToggle}
        onClickOutside={onToggle}
    >
        <input defaultValue={name} />
    </InlineValuePopover>
);
