import Tippy, { type TippyProps } from "@tippyjs/react";
import React from "react";
import { followCursor } from "tippy.js"; // Dont remove this even if unused. It is required for one prop
import "tippy.js/dist/tippy.css"; // If we customize the style, the change this and import our own style

export interface TooltipProps extends Omit<Partial<TippyProps>, "content" | "children" | "className"> {
    content: React.ReactNode; // string, an element, or an array of elements
    children: React.ReactNode;
    readonly className?: string;
}

// TODO: Implement "as='div'"
export const Tooltip = ({ content, children, className, ...rest }: TooltipProps) => {
    return (
        <Tippy content={content} {...rest} className="ui-tooltip text-white" plugins={[followCursor]}>
            <span className={className}>{children}</span>
        </Tippy>
    );
};
