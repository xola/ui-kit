import React from "react";
import styles from "./Tooltip.module.css"
import { usePopperTooltip } from "react-popper-tooltip";

const defaultProps = {
    closeOnOutsideClick: true,
    closeOnTriggerHidden: false,
    defaultVisible: false,
    delayHide: 0,
    delayShow: 0,
    interactive: false,
    followCursor: false,
    offset: [0, 6],
    placement: "right",
    trigger: "hover",
    text: "Hello World",
};

export const Tooltip = (settings) => {
    const config = Object.assign({}, defaultProps, { visible: settings.isVisible }, settings);
    const popperConfig = {
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: config.offset ? config.offset : [0, 15],
                },
            },
            {
                name: "preventOverflow",
                options: {
                    altAxis: true,
                },
            },
        ],
    };
    
    const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip(config, popperConfig);
    
    return (
        <>
            <span ref={setTriggerRef}>{config.children}</span>
            {visible && (
                <div ref={setTooltipRef} {...getTooltipProps({ className: "tooltip-container" })}>
                    <div {...getArrowProps({ className: "tooltip-arrow" })} />
                    {config.text}
                </div>
            )}
        </>
    );
};
