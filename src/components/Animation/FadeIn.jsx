import { Transition } from "@headlessui/react";
import PropTypes from "prop-types";
import React from "react";

export const FadeIn = ({
    shouldShow = true,
    appear = true,
    tag = "div",
    enter = "transition-opacity duration-700",
    enterFrom = "opacity-0",
    enterTo = "opacity-100",
    className,
    children,
    ...rest
}) => {
    return (
        <Transition
            show={shouldShow}
            appear={appear}
            as={tag}
            className={className}
            enter={enter}
            enterFrom={enterFrom}
            enterTo={enterTo}
            {...rest}
        >
            {children}
        </Transition>
    );
};

FadeIn.propTypes = {
    shouldShow: PropTypes.bool,
    appear: PropTypes.bool,
    tag: PropTypes.string,
    enter: PropTypes.string,
    enterFrom: PropTypes.string,
    enterTo: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
};
