import * as RadixCollapsible from "@radix-ui/react-collapsible";
import PropTypes from "prop-types";
import React from "react";

/**
 * Slides the content down from behind its own top edge while the box takes its full height at
 * once, as the 3.x transition did, rather than growing with `--radix-collapsible-content-height`.
 */
export const SlideDown = ({ isOpen, children }) => {
    return (
        <RadixCollapsible.Root open={isOpen} className="overflow-hidden">
            <RadixCollapsible.Content className="data-[state=closed]:animate-slide-down-out data-[state=open]:animate-slide-down-in">
                {children}
            </RadixCollapsible.Content>
        </RadixCollapsible.Root>
    );
};

SlideDown.propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.node,
};
